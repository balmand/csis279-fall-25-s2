export default class UserDTO {
    constructor({ id, first_name, last_name, email, created_at }) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.created_at = created_at;
    }

    static fromEntity(entity) {
        return new UserDTO(entity);
    }
}
