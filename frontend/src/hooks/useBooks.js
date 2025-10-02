/**
 * Simple useBooks Hook
 * 
 * This hook demonstrates:
 * - Custom React hooks
 * - State management
 * - API integration
 * - Error handling
 */

import { useState, useEffect, useCallback } from 'react';
import { bookService } from '../services/bookService';

export function useBooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all books
    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await bookService.getAll();
            setBooks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Create a new book
    const createBook = useCallback(async (bookData) => {
        setLoading(true);
        setError(null);
        
        try {
            const newBook = await bookService.create(bookData);
            setBooks(prev => [newBook, ...prev]);
            return newBook;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update an existing book
    const updateBook = useCallback(async (id, bookData) => {
        setLoading(true);
        setError(null);
        
        try {
            const updatedBook = await bookService.update(id, bookData);
            setBooks(prev => prev.map(book => 
                book.id === id ? updatedBook : book
            ));
            return updatedBook;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete a book
    const deleteBook = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        
        try {
            await bookService.delete(id);
            setBooks(prev => prev.filter(book => book.id !== id));
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Search books
    const searchBooks = useCallback(async (query) => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await bookService.search(query);
            setBooks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Clear error
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Load books on mount
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return {
        books,
        loading,
        error,
        fetchBooks,
        createBook,
        updateBook,
        deleteBook,
        searchBooks,
        clearError
    };
}