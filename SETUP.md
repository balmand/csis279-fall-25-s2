# Setup Guide

## Quick Start

### 1. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE books_db;
```

### 2. Environment Variables

Create a `.env` file in the `api` directory:

```env
# Database Configuration
PGHOST=localhost
PGPORT=5432
PGDATABASE=books_db
PGUSER=postgres
PGPASSWORD=postgres

# Server Configuration
PORT=4000
NODE_ENV=development
```

### 3. Install Dependencies

```bash
# Backend
cd api
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Run Database Schema

```bash
psql books_db < api/database/schema.sql
```

### 5. Start the Application

```bash
# Terminal 1: Start backend
cd api
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

### 6. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Health Check: http://localhost:4000/health

## Troubleshooting

### Database Connection Issues
- Make sure PostgreSQL is running
- Check your database credentials in `.env`
- Verify the database exists

### Port Conflicts
- Backend runs on port 4000
- Frontend runs on port 3000
- Change ports in `.env` if needed

### API Connection Issues
- Check that backend is running
- Verify API URL in frontend service
- Check browser console for errors
