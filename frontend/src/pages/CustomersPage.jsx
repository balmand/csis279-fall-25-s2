import React, { useState } from 'react';
import { useCustomers } from '../hooks/useCustomers';
import CustomerForm from '../components/CustomerForm';
import CustomerList from '../components/CustomerList';

export default function CustomersPage() {
  const { 
    customers, 
    loading, 
    error, 
    fetchCustomers,
    updateCustomer,
    createCustomer,
    deleteCustomer 
  } = useCustomers();

  const [editCustomer, setEditCustomer] = useState(null);

  const handleSaveCustomer = async (customerData, id) => {
    try {
      if (id) {
        await updateCustomer(id, customerData);
      } else {
        await createCustomer(customerData);
      }
      setEditCustomer(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEdit = (customer) => {
    setEditCustomer(customer);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      if (editCustomer?.id === id) setEditCustomer(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditCustomer(null);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Customer Management</h1>

      <CustomerForm
        onSave={handleSaveCustomer}
        editCustomer={editCustomer}
        onCancel={handleCancelEdit}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <CustomerList
        customers={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
