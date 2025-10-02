/**
 * Simple Book Service
 * 
 * This service demonstrates basic clean code principles:
 * - Single responsibility
 * - Clear function names
 * - Simple error handling
 */

export class BookService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    /**
     * Get all books
     * @returns {Promise<Array>} List of books
     */
    async getAllBooks() {
        try {
            return await this.bookRepository.findAll();
        } catch (error) {
            throw new Error(`Failed to get books: ${error.message}`);
        }
    }

    /**
     * Get a book by ID
     * @param {number} id - Book ID
     * @returns {Promise<Object|null>} Book or null if not found
     */
    async getBookById(id) {
        try {
            if (!id || isNaN(id)) {
                throw new Error('Invalid book ID');
            }
            
            return await this.bookRepository.findById(id);
        } catch (error) {
            throw new Error(`Failed to get book: ${error.message}`);
        }
    }

    /**
     * Create a new book
     * @param {Object} bookData - Book data
     * @returns {Promise<Object>} Created book
     */
    async createBook(bookData) {
        try {
            // Simple validation
            this.validateBookData(bookData);
            
            return await this.bookRepository.create(bookData);
        } catch (error) {
            throw new Error(`Failed to create book: ${error.message}`);
        }
    }

    /**
     * Update a book
     * @param {number} id - Book ID
     * @param {Object} bookData - Updated book data
     * @returns {Promise<Object|null>} Updated book or null if not found
     */
    async updateBook(id, bookData) {
        try {
            if (!id || isNaN(id)) {
                throw new Error('Invalid book ID');
            }
            
            if (!bookData || Object.keys(bookData).length === 0) {
                throw new Error('No data provided for update');
            }
            
            return await this.bookRepository.update(id, bookData);
        } catch (error) {
            throw new Error(`Failed to update book: ${error.message}`);
        }
    }

    /**
     * Delete a book
     * @param {number} id - Book ID
     * @returns {Promise<boolean>} True if deleted, false if not found
     */
    async deleteBook(id) {
        try {
            if (!id || isNaN(id)) {
                throw new Error('Invalid book ID');
            }
            
            return await this.bookRepository.delete(id);
        } catch (error) {
            throw new Error(`Failed to delete book: ${error.message}`);
        }
    }

    /**
     * Search books by title or author
     * @param {string} query - Search query
     * @returns {Promise<Array>} Matching books
     */
    async searchBooks(query) {
        try {
            if (!query || query.trim().length === 0) {
                return await this.getAllBooks();
            }
            
            return await this.bookRepository.search(query.trim());
        } catch (error) {
            throw new Error(`Failed to search books: ${error.message}`);
        }
    }

    /**
     * Validate book data
     * @param {Object} bookData - Book data to validate
     * @throws {Error} If validation fails
     */
    validateBookData(bookData) {
        if (!bookData) {
            throw new Error('Book data is required');
        }

        if (!bookData.title || bookData.title.trim().length === 0) {
            throw new Error('Title is required');
        }

        if (!bookData.author || bookData.author.trim().length === 0) {
            throw new Error('Author is required');
        }

        if (!bookData.year || isNaN(bookData.year)) {
            throw new Error('Year must be a valid number');
        }

        if (bookData.year < 1000 || bookData.year > new Date().getFullYear() + 1) {
            throw new Error('Year must be between 1000 and next year');
        }

        if (!bookData.price || isNaN(bookData.price)) {
            throw new Error('Price must be a valid number');
        }

        if (bookData.price < 0) {
            throw new Error('Price must be greater than or equal to 0');
        }
    }
}