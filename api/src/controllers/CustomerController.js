import { validationResult } from 'express-validator';

export class CustomerController {
  constructor(service) {
    this.service = service;
  }

  // Helper to validate request
  _validate(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return true; // return true if there are validation errors
    }
    return false;
  }

  list = async (req, res, next) => {
    try {
      res.json(await this.service.listCustomers());
    } catch (e) {
      next(e);
    }
  };

  get = async (req, res, next) => {
    try {
      if (this._validate(req, res)) return;

      const customer = await this.service.getCustomer(req.params.id);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json(customer);
    } catch (e) {
      next(e);
    }
  };

  create = async (req, res, next) => {
    try {
      if (this._validate(req, res)) return;

      const newCustomer = await this.service.createCustomer(req.body);
      res.status(201).json(newCustomer);
    } catch (e) {
      next(e);
    }
  };

  update = async (req, res, next) => {
    try {
      if (this._validate(req, res)) return;

      const updatedCustomer = await this.service.updateCustomer(req.params.id, req.body);
      if (!updatedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(201).json(updatedCustomer);
    } catch (e) {
      next(e);
    }
  };

  delete = async (req, res, next) => {
    try {
      if (this._validate(req, res)) return;

      const ok = await this.service.deleteCustomer(req.params.id);
      if (!ok) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  };
}
