import { pool } from '../../config/db.js';
import { User } from '../entities/User.js';

export class UserRepository {
    async create({ firstName, lastName, email, passwordHash }) {
        const sql = `
            INSERT INTO users (first_name, last_name, email, password_hash)
            VALUES ($1, $2, $3, $4)
            RETURNING id, first_name, last_name, email, password_hash, created_at, updated_at;
        `;

        const { rows } = await pool.query(sql, [firstName, lastName, email, passwordHash]);
        return User.fromRow(rows[0]);
    }

    async findByEmail(email) {
        const sql = `
            SELECT id, first_name, last_name, email, password_hash, created_at, updated_at
            FROM users
            WHERE email = $1;
        `;

        const { rows } = await pool.query(sql, [email]);
        return User.fromRow(rows[0]);
    }

    async findById(id) {
        const sql = `
            SELECT id, first_name, last_name, email, password_hash, created_at, updated_at
            FROM users
            WHERE id = $1;
        `;

        const { rows } = await pool.query(sql, [id]);
        return User.fromRow(rows[0]);
    }
}
