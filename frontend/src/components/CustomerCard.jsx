import React from 'react';

export function CustomerCard({ customer, onEdit, onDelete }) {
    return (
        <div className="book-card">
            <div className="book-info">
                <h3 className="book-title">{customer.name}</h3>
                <p className="book-author">{customer.email}</p>
                <p className="book-year">{customer.phone}</p>
                <p className="book-year">{customer.address}</p>
            </div>
            <div className="book-actions">
                <button className="btn btn-secondary" onClick={() => onEdit(customer)}>
                    Edit
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(customer.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}
