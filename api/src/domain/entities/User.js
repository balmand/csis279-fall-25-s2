export class User {
    constructor({ id, firstName, lastName, email, passwordHash, createdAt, updatedAt }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromRow(row) {
        if (!row) {
            return null;
        }

        return new User({
            id: row.id,
            firstName: row.first_name,
            lastName: row.last_name,
            email: row.email,
            passwordHash: row.password_hash,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        });
    }
}
