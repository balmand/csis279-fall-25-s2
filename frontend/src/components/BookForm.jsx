/**
 * Simple Book Form Component
 * 
 * This component demonstrates:
 * - Form handling
 * - Input validation
 * - Controlled components
 */

import React, { useState, useEffect } from 'react';

export function BookForm({ book, onSubmit, onCancel, loading = false }) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        year: new Date().getFullYear(),
        price: 0
    });
    
    const [errors, setErrors] = useState({});

    // Update form data when book prop changes
    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title || '',
                author: book.author || '',
                year: book.year || new Date().getFullYear(),
                price: book.price || 0
            });
        }
    }, [book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.author.trim()) {
            newErrors.author = 'Author is required';
        }

        if (!formData.year || isNaN(formData.year)) {
            newErrors.year = 'Year must be a valid number';
        } else if (formData.year < 1000 || formData.year > new Date().getFullYear() + 1) {
            newErrors.year = 'Year must be between 1000 and next year';
        }

        if (!formData.price || isNaN(formData.price)) {
            newErrors.price = 'Price must be a valid number';
        } else if (formData.price < 0) {
            newErrors.price = 'Price must be greater than or equal to 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <form className="book-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={errors.title ? 'error' : ''}
                    disabled={loading}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="author">Author *</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className={errors.author ? 'error' : ''}
                    disabled={loading}
                />
                {errors.author && <span className="error-message">{errors.author}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="year">Year *</label>
                <input
                    type="number"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    min="1000"
                    max={new Date().getFullYear() + 1}
                    className={errors.year ? 'error' : ''}
                    disabled={loading}
                />
                {errors.year && <span className="error-message">{errors.year}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="price">Price *</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={errors.price ? 'error' : ''}
                    disabled={loading}
                />
                {errors.price && <span className="error-message">{errors.price}</span>}
            </div>

            <div className="form-actions">
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : (book ? 'Update Book' : 'Add Book')}
                </button>
                
                {onCancel && (
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default BookForm;
