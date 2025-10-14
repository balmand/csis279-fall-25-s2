import { pool } from "../../config/db.js";
import { User } from "../entities/User.js";

export class UserRepository {
    // Create (Register) a new user
    async create({ first_name, last_name, email, password }) {
        const sql = `
            INSERT INTO users (first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id, first_name, last_name, email, created_at;
        `;
        const { rows } = await pool.query(sql, [first_name, last_name, email, password]);
        return new User(rows[0]);
    }

    // Find a user by email (useful to check if email already exists)
    async findByEmail(email) {
        const sql = `
            SELECT id, first_name, last_name, email, password, created_at
            FROM users
            WHERE email = $1;
        `;
        const { rows } = await pool.query(sql, [email]);
        return rows[0] ? new User(rows[0]) : null;
    }
}
