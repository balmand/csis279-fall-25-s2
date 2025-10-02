/**
 * Simple Book Model
 * 
 * This model demonstrates basic data structure and validation
 */

export class Book {
    constructor(data) {
        this.id = data.id || null;
        this.title = data.title || '';
        this.author = data.author || '';
        this.year = data.year || new Date().getFullYear();
        this.price = data.price || 0;
        this.created_at = data.created_at || null;
        this.updated_at = data.updated_at || null;
    }

    /**
     * Convert book to plain object
     * @returns {Object} Plain object representation
     */
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            year: this.year,
            price: this.price,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }

    /**
     * Check if book data is valid
     * @returns {boolean} True if valid
     */
    isValid() {
        return this.title.length > 0 && 
               this.author.length > 0 && 
               this.year >= 1000 && 
               this.year <= new Date().getFullYear() + 1 &&
               this.price >= 0;
    }

    /**
     * Get validation errors
     * @returns {Array} Array of error messages
     */
    getValidationErrors() {
        const errors = [];

        if (this.title.length === 0) {
            errors.push('Title is required');
        }

        if (this.author.length === 0) {
            errors.push('Author is required');
        }

        if (this.year < 1000 || this.year > new Date().getFullYear() + 1) {
            errors.push('Year must be between 1000 and next year');
        }

        if (this.price < 0) {
            errors.push('Price must be greater than or equal to 0');
        }

        return errors;
    }
}
