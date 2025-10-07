export class CustomerDTO {
    constructor({ id, name, email, phone, address }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }

    static fromEntity(entity){
        return new CustomerDTO(entity);
    }
}