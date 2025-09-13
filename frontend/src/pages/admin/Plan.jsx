import React, { useState, useEffect } from "react";
import PlanForm from "../../components/PlanForm";
import PlanTable from "../../components/PlanTable";
import EditPlanModal from "../../components/EditPlanModal";


/*
  Admin Plan page:
   - stores plans in localStorage so state survives reloads
   - supports add / edit / delete
*/

const STORAGE_KEY = "sms_admin_plans_v1";

export default function Plan() {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setPlans(JSON.parse(raw));
    else {
      // seed data if none
      const seed = [
        { id: 1, name: "Basic Plan", price: 999, quota: "Limited Features", validityDays: 30, description: "Perfect for individuals" },
        { id: 2, name: "Premium Plan", price: 1999, quota: "All Features", validityDays: 30, description: "Best for businesses" }
      ];
      setPlans(seed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  }, [plans]);

  const addPlan = (p) => {
    setPlans((prev) => [...prev, { id: Date.now(), ...p }]);
  };

  const deletePlan = (id) => {
    if (!confirm("Delete this plan?")) return;
    setPlans((prev) => prev.filter((x) => x.id !== id));
  };

  const updatePlan = (updated) => {
    setPlans((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditingPlan(null);
  };

  return (
    <div className="space-y-8">
      {/* Status Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Plans</h2>
          <p className="text-gray-600">Create and manage your subscription plans</p>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium">{plans.length} plans active</span>
        </div>
      </div>

      {/* Form */}
      <PlanForm onAdd={addPlan} />
      
      {/* Table */}
      <PlanTable plans={plans} onDelete={deletePlan} onEdit={(p) => setEditingPlan(p)} />

      {editingPlan && (
        <EditPlanModal plan={editingPlan} onClose={() => setEditingPlan(null)} onSave={updatePlan} />
      )}
    </div>
  );
}
