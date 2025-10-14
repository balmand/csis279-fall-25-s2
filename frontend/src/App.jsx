<<<<<<< HEAD
/**
 * Simple App Component
 * 
 * This demonstrates basic React app structure
 */

import React from 'react';
import BooksPage from './pages/BooksPage';
import CustomersPage from './pages/CustomersPage';
import AboutUs from './pages/AboutUs'
import HomePage from './pages/HomePage';
import { Router } from 'react-router-dom';
import { Link, Routes, Route } from 'react-router-dom';
import './App.css';

=======
import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import CustomersPage from "./pages/CustomersPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Menu from "./components/Menu.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import "./App.css";
import LogoutButton from "./components/LogoutButton";
import { useAuth } from "./context/AuthContext.jsx";
>>>>>>> e9347b6f6d9d6862c0c06a58121fc2844a90c142
function App() {
  const { initializing, isAuthenticated } = useAuth();

  if (initializing) {
    return (
      <div className="App">
        <main className="App-main">
          <p>Loading session…</p>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Management System</h1>
        <p>Learn Modularity, Clean Code & Reusability</p>
<<<<<<< HEAD
        <Link className='btn-primary' to="/">Home</Link> |
        <Link className='btn-primary' to="/books">Books</Link> |
        <Link className='btn-primary' to="/customers">Customers</Link> |
        <Link className='btn-primary' to="/aboutus">About us</Link>

=======
        {/* {registeredUser && <LogoutButton />} */}
        <Menu />
>>>>>>> e9347b6f6d9d6862c0c06a58121fc2844a90c142
      </header>

      <main className="App-main">
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/" element={<><CustomersPage /> <BooksPage /></>} />
=======
          <Route>
            <Route path="/"/>
            <Route path="/books" element={<BooksPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/aboutus" element={<AboutUs />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
          />
>>>>>>> e9347b6f6d9d6862c0c06a58121fc2844a90c142
        </Routes>
      </main>

      <footer className="App-footer">
        <p>Simple Book Management App - Educational Project</p>
      </footer>
    </div>
  );
}

export default App;
