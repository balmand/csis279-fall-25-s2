import {CustomerDTO} from '../domain/dto/CustomerDTO.js';

export class CustomerService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }

    async listCustomers() {
        try {
            const customers = await this.customerRepository.findAll();
            return customers.map(CustomerDTO.fromEntity);
        } catch (error) {
            throw new Error('Failed to list customers: ' + error.message);
        }
    }

    async getCustomer(id) {
        try {
            const customer = await this.customerRepository.findById(id);
            return customer ? CustomerDTO.fromEntity(customer) : null;
        } catch (error) {
            throw new Error(`Failed to get customer with id ${id}: ${error.message}`);
        }
    }

    async createCustomer(data) {
        try {
            const customer = await this.customerRepository.create(data);
            return CustomerDTO.fromEntity(customer);
        } catch (error) {
            throw new Error('Failed to create customer: ' + error.message);
        }
    }

    async updateCustomer(id, data) {
        try {
            const customer = await this.customerRepository.update(id, data);
            return customer ? CustomerDTO.fromEntity(customer) : null;
        } catch (error) {
            throw new Error(`Failed to update customer with id ${id}: ${error.message}`);
        }
    }

    async deleteCustomer(id) {
        try {
            return await this.customerRepository.delete(id);
        } catch (error) {
            throw new Error(`Failed to delete customer with id ${id}: ${error.message}`);
        }
    }
}