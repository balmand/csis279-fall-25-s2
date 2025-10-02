import { pool } from '../config/db.js';
import { Customer } from '../models/Customer.js';

export class CustomerRepository {
    constructor() {
        this.pool = pool;
    }

    /**
     * Get all customers
     * @returns {Promise<Array>} List of customers
     */
    async findAll() {
        try {
            const sql = `
                SELECT customer_id, first_name, 
                last_name, phone, email, username,
                password, date_of_birth, is_active,
                created_at, updated_at
                FROM customers 
                ORDER BY created_at DESC
            `;
            const result = await this.pool.query(sql);
            return result.rows.map(row => new Customer(row));
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    /**
     * Get customer by ID
     * @param {number} id - Customer ID
     * @returns {Promise<Customer|null>} Customer or null if not found
     */
    async findById(id) {
        try {
            const sql = `
                SELECT customer_id, first_name, 
                last_name, phone, email, username,
                password, date_of_birth, is_active,
                created_at, updated_at
                FROM customers
                WHERE id = $1
            `;
            const result = await this.pool.query(sql, [id]);
            
            if (result.rows.length === 0) {return null;}
            
            return new Customer(result.rows[0]);
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    /**
     * Create a new customer
     * @param {Object} customerData - Customer data
     * @returns {Promise<Customer>} Created customer
     */





    async create(customerData) {
        try {
            const sql = `
                INSERT INTO customers (customer_id, first_name, 
                last_name, phone, email, username,
                password, date_of_birth, is_active)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING customer_id, first_name, 
                last_name, phone, email, username,
                password, date_of_birth, is_active, created_at, updated_at
            `;
            const values = [customerData.firtName, customerData.lastName,
                     customerData.phone, customerData.email, customerData.username
                    , customerData.password, customerData.dateOfBirth,
                    customerData.isActive];

            const result = await this.pool.query(sql, values);
            
            return new Customer(result.rows[0]);
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    /**
     * Update a Customer
     * @param {number} id - Customer ID
     * @param {Object} cstomerData - Updated customer data
     * @returns {Promise<Customer|null>} Updated custo,er or null if not found
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









}
