export class User {
    constructor({ id = null, first_name, last_name, email, password, created_at = null }) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
    }
}
