import React, { useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [plans, setPlans] = useState([
    { id: 1, name: "Basic", price: "₹199", validity: "1 Month" },
    { id: 2, name: "Standard", price: "₹499", validity: "3 Months" },
    { id: 3, name: "Premium", price: "₹999", validity: "6 Months" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  const [currentPlan, setCurrentPlan] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Add Plan
  const handleAddPlan = (e) => {
    e.preventDefault();
    const newPlan = {
      id: Date.now(),
      name: e.target.name.value,
      price: e.target.price.value,
      validity: e.target.validity.value,
    };
    setPlans([...plans, newPlan]);
    setShowAddModal(false);
  };

  // Edit Plan
  const handleEditPlan = (e) => {
    e.preventDefault();
    setPlans(
      plans.map((p) =>
        p.id === currentPlan.id
          ? {
              ...p,
              name: e.target.name.value,
              price: e.target.price.value,
              validity: e.target.validity.value,
            }
          : p
      )
    );
    setShowEditModal(false);
  };

  // Delete Plan
  const confirmDelete = () => {
    setPlans(plans.filter((p) => p.id !== deleteId));
    setShowDeleteModal(false);
  };

  // Update Pricing
  const handleUpdatePricing = (e) => {
    e.preventDefault();
    setPlans(
      plans.map((p) =>
        p.id === currentPlan.id
          ? { ...p, price: e.target.price.value }
          : p
      )
    );
    setShowPricingModal(false);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-title">Admin Panel</div>
        <nav className="sidebar-nav">
          <a href="#dashboard">Dashboard</a>
          <a href="#plans">Manage Plans</a>
          <a href="#pricing">Pricing</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="main">
        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-title">Admin Dashboard</div>
          <button className="logout-btn">Logout</button>
        </div>

        {/* Dashboard Cards */}
        <div className="cards-container">
          <div className="card">
            <div className="card-title">Active Subscriptions</div>
            <div className="card-value">120</div>
          </div>
          <div className="card">
            <div className="card-title">Canceled Subscriptions</div>
            <div className="card-value">15</div>
          </div>
          <div className="card">
            <div className="card-title">Top Plan</div>
            <div className="card-value">Premium</div>
          </div>
          <div className="card">
            <div className="card-title">AI Recommendation</div>
            <div className="card-value">Offer Discount</div>
          </div>
        </div>

        {/* Manage Plans */}
        <div className="table-container" id="plans">
          <div className="manage-plans-header">
            <h2>Manage Plans</h2>
            <button className="add-btn" onClick={() => setShowAddModal(true)}>
              + Add Plan
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Validity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id}>
                  <td>{plan.name}</td>
                  <td>{plan.price}</td>
                  <td>{plan.validity}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setCurrentPlan(plan);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        setDeleteId(plan.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setCurrentPlan(plan);
                        setShowPricingModal(true);
                      }}
                    >
                      Update Pricing
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pricing Section */}
        <div className="pricing-container" id="pricing">
          <h2>Pricing via Self-Service Portal</h2>
          <p>
            Admins can update plan pricing anytime via this portal. Select a
            plan from the list above and click <b>Update Pricing</b>.
          </p>
        </div>
      </main>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Plan</h2>
            <form onSubmit={handleAddPlan}>
              <input type="text" name="name" placeholder="Plan Name" required />
              <input type="text" name="price" placeholder="Price" required />
              <input
                type="text"
                name="validity"
                placeholder="Validity"
                required
              />
              <div className="modal-actions">
                <button type="submit" className="add-btn">Save</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && currentPlan && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Plan</h2>
            <form onSubmit={handleEditPlan}>
              <input
                type="text"
                name="name"
                defaultValue={currentPlan.name}
                required
              />
              <input
                type="text"
                name="price"
                defaultValue={currentPlan.price}
                required
              />
              <input
                type="text"
                name="validity"
                defaultValue={currentPlan.validity}
                required
              />
              <div className="modal-actions">
                <button type="submit" className="add-btn">Update</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this plan?</p>
            <div className="modal-actions">
              <button className="delete-btn" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Pricing Modal */}
      {showPricingModal && currentPlan && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Update Pricing</h2>
            <form onSubmit={handleUpdatePricing}>
              <input
                type="text"
                name="price"
                defaultValue={currentPlan.price}
                required
              />
              <div className="modal-actions">
                <button type="submit" className="add-btn">Save</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowPricingModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
