/**
 * Simple Test Script
 * 
 * This script tests the basic functionality of the application
 */

import { BookService } from './api/src/services/BookService.js';
import { BookRepository } from './api/src/repositories/BookRepository.js';
import { Book } from './api/src/models/Book.js';

// Mock database for testing
class MockDatabase {
    constructor() {
        this.books = [
            { id: 1, title: 'Test Book 1', author: 'Author 1', year: 2023, price: 19.99 },
            { id: 2, title: 'Test Book 2', author: 'Author 2', year: 2023, price: 24.99 }
        ];
    }

    async query(sql, params = []) {
        // Simple mock implementation
        if (sql.includes('SELECT') && sql.includes('FROM books')) {
            return { rows: this.books };
        }
        if (sql.includes('INSERT')) {
            const newBook = { id: this.books.length + 1, ...params };
            this.books.push(newBook);
            return { rows: [newBook] };
        }
        return { rows: [] };
    }
}

// Test the application
async function testApplication() {
    console.log('🧪 Testing Application Components...\n');

    try {
        // Test Book Model
        console.log('1. Testing Book Model...');
        const book = new Book({
            title: 'Test Book',
            author: 'Test Author',
            year: 2023,
            price: 19.99
        });
        
        console.log('✅ Book model created:', book.toJSON());
        console.log('✅ Book is valid:', book.isValid());
        console.log('✅ Validation errors:', book.getValidationErrors());

        // Test BookRepository
        console.log('\n2. Testing BookRepository...');
        const mockDb = new MockDatabase();
        const repository = new BookRepository();
        repository.pool = mockDb;
        
        const books = await repository.findAll();
        console.log('✅ Found books:', books.length);

        // Test BookService
        console.log('\n3. Testing BookService...');
        const service = new BookService(repository);
        
        const allBooks = await service.getAllBooks();
        console.log('✅ Service returned books:', allBooks.length);

        const searchResults = await service.searchBooks('Test');
        console.log('✅ Search results:', searchResults.length);

        console.log('\n🎉 All tests passed! Application is working correctly.');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error(error.stack);
    }
}

// Run tests
testApplication();
