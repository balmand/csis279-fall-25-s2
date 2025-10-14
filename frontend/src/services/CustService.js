// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';
const API_BASE_URL = 'http://localhost:4000/api';
const getAuthToken = () => localStorage.getItem('authToken');

class CustomerService {
    /**
     * Make HTTP request
     * @param {string} url - Request URL
     * @param {Object} options - Request options
     * @returns {Promise} Response data
     */
    async request(url, options = {}) {
        const token = getAuthToken();

        const headers = {
            'Content-Type': 'application/json',
            ...(options.headers ?? {})
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const config = {
            ...options,
            headers
        };

        try {
            const response = await fetch(`${API_BASE_URL}${url}`, config);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            // DELETE requests may return empty response
            if (response.status === 204) return null;

            return await response.json();
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Network error. Please check your connection.');
            }
            throw error;
        }
    }

    /** Get all customers */
    async getAll() {
        return this.request('/customers');
    }

    /** Get customer by ID */
    async getById(id) {
        return this.request(`/customers/${id}`);
    }

    /** Create a new customer */
    async create(customerData) {
        return this.request('/customers', {
            method: 'POST',
            body: JSON.stringify(customerData)
        });
    }

    /** Update a customer */
    async update(id, customerData) {
        return this.request(`/customers/${id}`, {
            method: 'PUT',
            body: JSON.stringify(customerData)
        });
    }

    /** Delete a customer */
    async delete(id) {
        return this.request(`/customers/${id}`, {
            method: 'DELETE'
        });
    }

    /** Search customers */
    async search(query) {
        return this.request(`/customers/search?q=${encodeURIComponent(query)}`);
    }
}

// Export singleton instance
export const customerService = new CustomerService();
