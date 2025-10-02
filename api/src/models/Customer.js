export class Customer {
    /**
     * @param {Object} data - Customer data from database or input form
     */
    constructor(data = {}) {
        this.id = data.id || null;  
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.username = data.username || '';
        this.password = data.password || '';
        this.phone = data.phone || '';
        this.email = data.email || '';
        this.isActive = data.isActive ?? false;
        this.dateOfBirth = data.dateOfBirth || null;
        this.created_at = data.created_at || null;
        this.updated_at = data.updated_at || null;
    }

    /**
     * Convert customer instance to a plain object for serialization
     * @returns {Object} Plain object representation
     */
    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            password: this.password,
            phone: this.phone,
            email: this.email,
            isActive: this.isActive,
            dateOfBirth: this.dateOfBirth,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}
