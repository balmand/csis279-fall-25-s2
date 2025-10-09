import React, { useState } from 'react';
import { useCustomers } from '../hooks/useCustomers';
import { CustomerCard } from '../components/CustomerCard';
import { CustomerForm } from '../components/CustomerForm';

export function CustomersPage() {
  const {
    customers,
    loading,
    error,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
    clearError
  } = useCustomers();

  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateCustomer = async (data) => {
    try {
      await createCustomer(data);
      setShowForm(false);
    } catch (error) {
    }
  };

  const handleUpdateCustomer = async (data) => {
    try {
      await updateCustomer(editingCustomer.id, data);
      setEditingCustomer(null);
    } catch (error) {

    }
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(id);
      } catch (error) {

      }
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) searchCustomers(query);
    else window.location.reload();
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCustomer(null);
  };

  return (
    <div className="customers-page">
      <div className="page-header">
        <h1>Customer Management</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Add New Customer
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          <p>{error}</p>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={clearError}
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="search-section">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={handleSearch}
          className="form-control"
        />
      </div>

      {showForm && (
        <div className="form-section">
          <h2>{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</h2>
          <CustomerForm
            customer={editingCustomer}
            onSubmit={editingCustomer ? handleUpdateCustomer : handleCreateCustomer}
            onCancel={handleCancelForm}
            loading={loading}
          />
        </div>
      )}

      <div className="customers-section">
        <h2>Customers ({customers.length})</h2>

        {loading && (
          <div className="loading">
            <p>Loading customers...</p>
          </div>
        )}

        {!loading && customers.length === 0 && (
          <div className="no-customers">
            <p>No customers found. Add your first customer!</p>
          </div>
        )}

        {!loading && customers.length > 0 && (
          <div className="books-grid">
            {customers.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                onEdit={handleEditCustomer}
                onDelete={handleDeleteCustomer}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomersPage;
