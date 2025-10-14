import { pool } from "../../config/db.js";
import { Customer } from "../entities/Customer.js";

export class CustomerRepository {
    async findAll() {
        const sql = `
            SELECT id, name, email, phone, address
            FROM customers
            ORDER BY id DESC;
        `;
        const { rows } = await pool.query(sql);
        return rows.map(r => new Customer(r));
    }

    async findById(id) {
        const sql = `
            SELECT id, name, email, phone, address
            FROM customers
            WHERE id = $1;
        `;
        const { rows } = await pool.query(sql, [id]);
        return rows.length ? new Customer(rows[0]) : null;
    }

    async create({ name, email, phone, address }) {
        const sql = `
            INSERT INTO customers (name, email, phone, address)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, phone, address;
        `;
        const { rows } = await pool.query(sql, [name, email, phone, address]);
        return rows.length ? new Customer(rows[0]) : null;
    }

    async update(id, { name, email, phone, address }) {
        const sql = `
            UPDATE customers
            SET name = $1, email = $2, phone = $3, address = $4
            WHERE id = $5
            RETURNING id, name, email, phone, address;
        `;
        const { rows } = await pool.query(sql, [name, email, phone, address, id]);
        return rows.length ? new Customer(rows[0]) : null;
    }

    async delete(id) {
        const { rowCount } = await pool.query('DELETE FROM customers WHERE id = $1', [id]);
        return rowCount > 0;
    }
}
