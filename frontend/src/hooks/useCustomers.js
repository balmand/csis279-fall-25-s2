import { useState, useEffect, useCallback } from 'react';
import { customerService } from '../services/CustService';

export function useCustomers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all customers
    const fetchCustomers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await customerService.getAll();
            setCustomers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Create a new customer
    const createCustomer = useCallback(async (customerData) => {
        setLoading(true);
        setError(null);
        try {
            const newCustomer = await customerService.create(customerData);
            setCustomers(prev => [newCustomer, ...prev]);
            return newCustomer;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update an existing customer
    const updateCustomer = useCallback(async (id, customerData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedCustomer = await customerService.update(id, customerData);
            setCustomers(prev => prev.map(c => c.id === id ? updatedCustomer : c));
            return updatedCustomer;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete a customer
    const deleteCustomer = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await customerService.delete(id);
            setCustomers(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Search customers
    const searchCustomers = useCallback(async (query) => {
        setLoading(true);
        setError(null);
        try {
            const data = await customerService.search(query);
            setCustomers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Clear error
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Load customers on mount
    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    return {
        customers,
        loading,
        error,
        fetchCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer,
        searchCustomers,
        clearError
    };
}
