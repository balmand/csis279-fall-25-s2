/**
 * Simple Book Repository
 * 
 * This repository demonstrates:
 * - Data access layer
 * - Database operations
 * - Error handling
 */

import { pool } from '../config/db.js';
import { Book } from '../models/Book.js';

export class BookRepository {
    constructor() {
        this.pool = pool;
    }

    /**
     * Get all books
     * @returns {Promise<Array>} List of books
     */
    async findAll() {
        try {
            const sql = `
                SELECT id, title, author, year, price, created_at, updated_at
                FROM books 
                ORDER BY created_at DESC
            `;
            const result = await this.pool.query(sql);
            return result.rows.map(row => new Book(row));
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    /**
     * Get book by ID
     * @param {number} id - Book ID
     * @returns {Promise<Book|null>} Book or null if not found
     */
    async findById(id) {
        try {
            const sql = `
                SELECT id, title, author, year, price, created_at, updated_at
                FROM books 
                WHERE id = $1
            `;
            const result = await this.pool.query(sql, [id]);
            
            if (result.rows.length === 0) {
                return null;
            }
            
            return new Book(result.rows[0]);
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    /**
     * Create a new book
     * @param {Object} bookData - Book data
     * @returns {Promise<Book>} Created book
     */
    async create(bookData) {
        try {
            const sql = `
                INSERT INTO books (title, author, year, price)
                VALUES ($1, $2, $3, $4)
                RETURNING id, title, author, year, price, created_at, updated_at
            `;
            const values = [bookData.title, bookData.author, bookData.year, bookData.price];
            const result = await this.pool.query(sql, values);
            
            return new Book(result.rows[0]);
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    /**
     * Update a book
     * @param {number} id - Book ID
     * @param {Object} bookData - Updated book data
     * @returns {Promise<Book|null>} Updated book or null if not found
     */
    async update(id, bookData) {
        try {
            const fields = [];
            const values = [];
            let paramCount = 1;

            // Build dynamic update query
            for (const [key, value] of Object.entries(bookData)) {
                if (value !== undefined) {
                    fields.push(`${key} = $${paramCount}`);
                    values.push(value);
                    paramCount++;
                }
            }

            if (fields.length === 0) {
                throw new Error('No fields to update');
            }

            const sql = `
                UPDATE books 
                SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
                WHERE id = $${paramCount}
                RETURNING id, title, author, year, price, created_at, updated_at
            `;
            
            values.push(id);
            const result = await this.pool.query(sql, values);
            
            if (result.rows.length === 0) {
                return null;
            }
            
            return new Book(result.rows[0]);
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    /**
     * Delete a book
     * @param {number} id - Book ID
     * @returns {Promise<boolean>} True if deleted, false if not found
     */
    async delete(id) {
        try {
            const sql = 'DELETE FROM books WHERE id = $1';
            const result = await this.pool.query(sql, [id]);
            
            return result.rowCount > 0;
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    /**
     * Search books by title or author
     * @param {string} query - Search query
     * @returns {Promise<Array>} Matching books
     */
    async search(query) {
        try {
            const sql = `
                SELECT id, title, author, year, price, created_at, updated_at
                FROM books 
                WHERE title ILIKE $1 OR author ILIKE $1
                ORDER BY created_at DESC
            `;
            const searchPattern = `%${query}%`;
            const result = await this.pool.query(sql, [searchPattern]);
            
            return result.rows.map(row => new Book(row));
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }
}
