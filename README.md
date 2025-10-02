# Simple Book Management App
## Learning Modularity, Clean Code & Reusability

This is a simplified full-stack application that demonstrates basic principles of good software engineering through a book management system.

## 🎯 Learning Objectives

### 1. **Modularity**
- Separate concerns into different files
- Create reusable functions and components
- Organize code logically

### 2. **Clean Code**
- Write readable and maintainable code
- Use meaningful names
- Keep functions small and focused

### 3. **Reusability**
- Create components that can be used multiple times
- Write functions that work in different contexts
- Build a library of common utilities

## 🏗️ Project Structure

```
├── api/                    # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/    # Handle HTTP requests
│   │   ├── services/       # Business logic
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   └── utils/          # Helper functions
│   └── package.json
├── frontend/               # Frontend (React)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── services/       # API communication
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Helper functions
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- PostgreSQL (optional - can use SQLite for simplicity)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd csis-279-fall-25-s2
```

2. **Install backend dependencies**
```bash
cd api
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Start the application**
```bash
# Terminal 1: Start backend
cd api
npm start

# Terminal 2: Start frontend
cd frontend
npm start
```

## 📚 What You'll Learn

### Backend Concepts
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Models**: Define data structure
- **Routes**: Define API endpoints
- **Utils**: Reusable helper functions

### Frontend Concepts
- **Components**: Reusable UI pieces
- **Hooks**: Share logic between components
- **Services**: Communicate with backend
- **Utils**: Helper functions

## 🛠️ Key Features

### Backend Features
- RESTful API for books
- Input validation
- Error handling
- Database integration

### Frontend Features
- Book listing
- Add new books
- Edit existing books
- Delete books
- Search functionality

## 📖 Code Examples

### Simple Service Example
```javascript
// services/BookService.js
class BookService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    async getAllBooks() {
        return await this.bookRepository.findAll();
    }

    async createBook(bookData) {
        // Validate data
        if (!bookData.title || !bookData.author) {
            throw new Error('Title and author are required');
        }
        
        return await this.bookRepository.create(bookData);
    }
}
```

### Simple Component Example
```javascript
// components/BookList.jsx
function BookList({ books, onDelete }) {
    return (
        <div>
            <h2>Books</h2>
            {books.map(book => (
                <div key={book.id} className="book-item">
                    <h3>{book.title}</h3>
                    <p>By {book.author}</p>
                    <button onClick={() => onDelete(book.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
```

### Simple Hook Example
```javascript
// hooks/useBooks.js
function useBooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const data = await bookService.getAll();
            setBooks(data);
        } finally {
            setLoading(false);
        }
    };

    return { books, loading, fetchBooks };
}
```

## 🎓 Learning Path

1. **Start Simple**: Understand basic file organization
2. **Add Features**: Gradually add more functionality
3. **Refactor**: Improve code as you learn new patterns
4. **Practice**: Apply these concepts to your own projects

## 📝 Exercises

1. **Add a new field** to the book model (e.g., ISBN)
2. **Create a search function** that filters books by title
3. **Add validation** to prevent duplicate books
4. **Create a reusable button component**
5. **Add error handling** to API calls

## 🤝 Contributing

This is a learning project! Feel free to:
- Add new features
- Improve existing code
- Fix bugs
- Add documentation

## 📄 License

This project is for educational purposes.