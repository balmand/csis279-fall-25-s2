/**
 * Simple App Component
 * 
 * This demonstrates basic React app structure
 */

import React from 'react';
import BooksPage from './pages/BooksPage';
import CustomersPage from './pages/CustomersPage';
import AboutUsPage from './pages/AboutUsPage'
import { } from 'react-router-dom';
import { Link, Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  }

  const readUser = () => {
    console.log(localStorage.getItem("user"));
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Book Management System</h1>
        <p>Learn Modularity, Clean Code & Reusability</p>
        <div>
          <Link className to="/">Home</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/books">Books</Link>
        </div>
      </header>

      <main className="App-main">
        <Routes>
          <Route></Route>
          <Route path="/" element={<BooksPage /> <CustomersPage/>} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />

        </Routes>
      </main>

      <footer className="App-footer">
        <p>Simple Book Management App - Educational Project</p>

      </footer>
    </div>
  );
}

export default App;