/**
 * Simple Books Page
 * 
 * This page demonstrates:
 * - Using custom hooks
 * - Component composition
 * - State management
 * - Event handling
 */

import React, { useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import { BookCard } from '../components/BookCard';
import { BookForm } from '../components/BookForm';
import { formatCurrency } from '../utils/helpers';

export function BooksPage() {
    const {
        books,
        loading,
        error,
        createBook,
        updateBook,
        deleteBook,
        searchBooks,
        clearError
    } = useBooks();

    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleCreateBook = async (bookData) => {
        try {
            await createBook(bookData);
            setShowForm(false);
        } catch (error) {
            // Error is handled by the hook
        }
    };

    const handleUpdateBook = async (bookData) => {
        try {
            await updateBook(editingBook.id, bookData);
            setEditingBook(null);
        } catch (error) {
            // Error is handled by the hook
        }
    };

    const handleDeleteBook = async (bookId) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await deleteBook(bookId);
            } catch (error) {
                // Error is handled by the hook
            }
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim()) {
            searchBooks(query);
        } else {
            // Reset to show all books
            window.location.reload(); // Simple way to reset
        }
    };

    const handleEditBook = (book) => {
        setEditingBook(book);
        setShowForm(true);
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingBook(null);
    };

    return (
        <div className="books-page">
            <div className="page-header">
                <h1>Book Management</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    Add New Book
                </button>
            </div>

            {error && (
                <div className="alert alert-danger">
                    <p>{error}</p>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={clearError}
                    >
                        Dismiss
                    </button>
                </div>
            )}

            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="form-control"
                />
            </div>

            {showForm && (
                <div className="form-section">
                    <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
                    <BookForm
                        book={editingBook}
                        onSubmit={editingBook ? handleUpdateBook : handleCreateBook}
                        onCancel={handleCancelForm}
                        loading={loading}
                    />
                </div>
            )}

            <div className="books-section">
                <h2>Books ({books.length})</h2>

                {loading && (
                    <div className="loading">
                        <p>Loading books...</p>
                    </div>
                )}

                {!loading && books.length === 0 && (
                    <div className="no-books">
                        <p>No books found. Add your first book!</p>
                    </div>
                )}

                {!loading && books.length > 0 && (
                    <div className="books-grid">
                        {books.map(book => (
                            <BookCard
                                key={book.id}
                                book={book}
                                onEdit={handleEditBook}
                                onDelete={handleDeleteBook}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="stats-section">
                <h3>Statistics</h3>
                <div className="stats">
                    <div className="stat">
                        <strong>Total Books:</strong> {books.length}
                    </div>
                    <div className="stat">
                        <strong>Average Price:</strong> {
                            books.length > 0
                                ? formatCurrency(
                                    books.reduce((sum, book) => sum + Number(book.price), 0) / books.length
                                )
                                : '$0.00'
                        }
                    </div>
                    <div className="stat">
                        <strong>Books by Year:</strong> {
                            Object.entries(
                                books.reduce((acc, book) => {
                                    acc[book.year] = (acc[book.year] || 0) + 1;
                                    return acc;
                                }, {})
                            )
                                .map(([year, count]) => `${year}: ${count}`)
                                .join(', ')
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default BooksPage;
