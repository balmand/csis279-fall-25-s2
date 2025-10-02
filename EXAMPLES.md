# Code Examples

This document shows practical examples of the modularity, clean code, and reusability principles implemented in this project.

## Backend Examples

### 1. Service Layer (Clean Code)

```javascript
// services/BookService.js
export class BookService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    async createBook(bookData) {
        try {
            // Simple validation
            this.validateBookData(bookData);
            
            return await this.bookRepository.create(bookData);
        } catch (error) {
            throw new Error(`Failed to create book: ${error.message}`);
        }
    }

    validateBookData(bookData) {
        if (!bookData.title || bookData.title.trim().length === 0) {
            throw new Error('Title is required');
        }
        // ... more validation
    }
}
```

**Clean Code Principles:**
- Single responsibility (validation + business logic)
- Clear error messages
- Simple, readable functions

### 2. Repository Pattern (Modularity)

```javascript
// repositories/BookRepository.js
export class BookRepository {
    async findAll() {
        const sql = 'SELECT * FROM books ORDER BY created_at DESC';
        const result = await this.pool.query(sql);
        return result.rows.map(row => new Book(row));
    }

    async create(bookData) {
        const sql = 'INSERT INTO books (title, author, year, price) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [bookData.title, bookData.author, bookData.year, bookData.price];
        const result = await this.pool.query(sql, values);
        return new Book(result.rows[0]);
    }
}
```

**Modularity Principles:**
- Separation of concerns (data access vs business logic)
- Reusable database operations
- Clean interface

### 3. Model (Data Structure)

```javascript
// models/Book.js
export class Book {
    constructor(data) {
        this.id = data.id || null;
        this.title = data.title || '';
        this.author = data.author || '';
        this.year = data.year || new Date().getFullYear();
        this.price = data.price || 0;
    }

    isValid() {
        return this.title.length > 0 && 
               this.author.length > 0 && 
               this.year >= 1000 && 
               this.price >= 0;
    }
}
```

**Clean Code Principles:**
- Clear data structure
- Built-in validation
- Consistent interface

## Frontend Examples

### 1. Custom Hook (Reusability)

```javascript
// hooks/useBooks.js
export function useBooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createBook = async (bookData) => {
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
    };

    return { books, loading, error, createBook };
}
```

**Reusability Principles:**
- Shared state logic
- Consistent error handling
- Easy to use in any component

### 2. Reusable Component

```javascript
// components/BookCard.jsx
export function BookCard({ book, onEdit, onDelete }) {
    return (
        <div className="book-card">
            <h3>{book.title}</h3>
            <p>By {book.author}</p>
            <p>Published: {book.year}</p>
            <p>Price: ${book.price}</p>
            
            <div className="book-actions">
                <button onClick={() => onEdit(book)}>Edit</button>
                <button onClick={() => onDelete(book.id)}>Delete</button>
            </div>
        </div>
    );
}
```

**Reusability Principles:**
- Props-based customization
- Event handling through callbacks
- Consistent UI structure

### 3. Service Layer (API Communication)

```javascript
// services/bookService.js
class BookService {
    async request(url, options = {}) {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            ...options
        };

        try {
            const response = await fetch(`${API_BASE_URL}${url}`, config);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Network error. Please check your connection.');
            }
            throw error;
        }
    }

    async getAll() {
        return this.request('/books');
    }
}
```

**Clean Code Principles:**
- Centralized error handling
- Consistent API interface
- Clear error messages

## Utility Functions (Reusability)

```javascript
// utils/helpers.js
export function formatCurrency(amount) {
    if (isNaN(amount)) return '$0.00';
    
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

export function capitalizeWords(str) {
    if (typeof str !== 'string') return '';
    
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
```

**Reusability Principles:**
- Pure functions (no side effects)
- Clear, focused functionality
- Easy to test and maintain

## Learning Exercises

### Exercise 1: Add a New Field
1. Add `isbn` field to the Book model
2. Update the database schema
3. Modify the form to include ISBN input
4. Update validation

### Exercise 2: Create a Reusable Button Component
```javascript
function Button({ children, variant = 'primary', onClick, disabled }) {
    return (
        <button 
            className={`btn btn-${variant}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
```

### Exercise 3: Add Search Functionality
1. Create a search input component
2. Implement debounced search
3. Add search to the API
4. Update the UI to show results

### Exercise 4: Error Handling
1. Create an error boundary component
2. Add loading states
3. Implement retry functionality
4. Show user-friendly error messages

## Best Practices Demonstrated

1. **Single Responsibility**: Each function/component has one clear purpose
2. **DRY (Don't Repeat Yourself)**: Reusable functions and components
3. **Clear Naming**: Function and variable names explain their purpose
4. **Error Handling**: Consistent error handling patterns
5. **Separation of Concerns**: Clear boundaries between layers
6. **Testability**: Functions are easy to test in isolation
