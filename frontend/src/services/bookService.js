/**
 * Simple Book Service
 * 
 * This service demonstrates:
 * - API communication
 * - Error handling
 * - Data transformation
 */

//const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';
const API_BASE_URL = 'http://localhost:4000/api';

class BookService {
    /**
     * Make HTTP request
     * @param {string} url - Request URL
     * @param {Object} options - Request options
     * @returns {Promise} Response data
     */
    async request(url, options = {}) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(`${API_BASE_URL}${url}`, config);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Network error. Please check your connection.');
            }
            throw error;
        }
    }

    /**
     * Get all books
     * @returns {Promise<Array>} List of books
     */
    async getAll() {
        return this.request('/books');
    }

    /**
     * Get book by ID
     * @param {number} id - Book ID
     * @returns {Promise<Object>} Book data
     */
    async getById(id) {
        return this.request(`/books/${id}`);
    }

    /**
     * Create a new book
     * @param {Object} bookData - Book data
     * @returns {Promise<Object>} Created book
     */
    async create(bookData) {
        return this.request('/books', {
            method: 'POST',
            body: JSON.stringify(bookData)
        });
    }

    /**
     * Update a book
     * @param {number} id - Book ID
     * @param {Object} bookData - Updated book data
     * @returns {Promise<Object>} Updated book
     */
    async update(id, bookData) {
        return this.request(`/books/${id}`, {
            method: 'PUT',
            body: JSON.stringify(bookData)
        });
    }

    /**
     * Delete a book
     * @param {number} id - Book ID
     * @returns {Promise<void>}
     */
    async delete(id) {
        return this.request(`/books/${id}`, {
            method: 'DELETE'
        });
    }

    /**
     * Search books
     * @param {string} query - Search query
     * @returns {Promise<Array>} Matching books
     */
    async search(query) {
        return this.request(`/books/search?q=${encodeURIComponent(query)}`);
    }
}

// Export singleton instance
export const bookService = new BookService();