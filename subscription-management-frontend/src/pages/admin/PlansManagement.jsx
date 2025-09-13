import React, { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { useSubscription } from '../../contexts/SubscriptionContext.jsx';
import PlanCard from '../../components/admin/PlanCard';
import PlanForm from '../../components/admin/PlanForm';
import ConfirmationModal from '../../components/shared/ConfirmationModal';
import LoadingSpinner, { CardLoader } from '../../components/shared/LoadingSpinner';
import { PLAN_TYPES } from '../../utils/constants';
import { filterPlansByType, sortPlans } from '../../utils/helpers';

const PlansManagement = () => {
  const { plans, isLoading, createPlan, updatePlan, deletePlan, clearError } = useSubscription();
  
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter and sort plans
  const filteredPlans = plans
    .filter(plan => {
      const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || plan.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return sortPlans([a, b], sortBy, sortOrder);
    });

  const handleCreatePlan = () => {
    setEditingPlan(null);
    setShowForm(true);
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setShowForm(true);
  };

  const handleSavePlan = async (planData) => {
    setIsSubmitting(true);
    try {
      if (editingPlan) {
        await updatePlan(editingPlan.id, planData);
      } else {
        await createPlan(planData);
      }
      setShowForm(false);
      setEditingPlan(null);
    } catch (error) {
      console.error('Error saving plan:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePlan = (planId) => {
    setPlanToDelete(planId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsSubmitting(true);
    try {
      await deletePlan(planToDelete);
      setShowDeleteModal(false);
      setPlanToDelete(null);
    } catch (error) {
      console.error('Error deleting plan:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (planId, isActive) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      await updatePlan(planId, { ...plan, isActive });
    }
  };

  const handleExportPlans = () => {
    const csvContent = [
      ['Name', 'Type', 'Monthly Quota (GB)', 'Price ($)', 'Features', 'Status'],
      ...filteredPlans.map(plan => [
        plan.name,
        plan.type,
        plan.monthlyQuota,
        plan.price,
        plan.features.join('; '),
        plan.isActive ? 'Active' : 'Inactive'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plans.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading && plans.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <CardLoader key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Plans Management</h1>
            <p className="text-gray-600 mt-2">Manage subscription plans and pricing</p>
          </div>
          <button
            onClick={handleCreatePlan}
            className="btn-primary flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Plan
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="card">
            <div className="text-2xl font-bold text-gray-900">{plans.length}</div>
            <div className="text-sm text-gray-600">Total Plans</div>
          </div>
          <div className="card">
            <div className="text-2xl font-bold text-green-600">
              {plans.filter(p => p.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Active Plans</div>
          </div>
          <div className="card">
            <div className="text-2xl font-bold text-blue-600">
              {plans.filter(p => p.type === PLAN_TYPES.FIBERNET).length}
            </div>
            <div className="text-sm text-gray-600">Fibernet Plans</div>
          </div>
          <div className="card">
            <div className="text-2xl font-bold text-purple-600">
              {plans.filter(p => p.type === PLAN_TYPES.BROADBAND_COPPER).length}
            </div>
            <div className="text-sm text-gray-600">Broadband Plans</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search plans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="input-field"
              >
                <option value="all">All Types</option>
                <option value={PLAN_TYPES.FIBERNET}>Fibernet</option>
                <option value={PLAN_TYPES.BROADBAND_COPPER}>Broadband Copper</option>
              </select>
              
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="input-field"
              >
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="price-asc">Price Low-High</option>
                <option value="price-desc">Price High-Low</option>
                <option value="quota-asc">Quota Low-High</option>
                <option value="quota-desc">Quota High-Low</option>
              </select>
              
              <button
                onClick={handleExportPlans}
                className="btn-secondary flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      {filteredPlans.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No plans found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={handleEditPlan}
              onDelete={handleDeletePlan}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <PlanForm
          plan={editingPlan}
          onSave={handleSavePlan}
          onCancel={() => {
            setShowForm(false);
            setEditingPlan(null);
          }}
          isLoading={isSubmitting}
        />
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setPlanToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Plan"
        message="Are you sure you want to delete this plan? This action cannot be undone."
        confirmText="Delete"
        type="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default PlansManagement;
