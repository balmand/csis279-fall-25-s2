/**
 * Simple App Component
 * 
 * This demonstrates basic React app structure
 */

import React from 'react';
import BooksPage from './pages/BooksPage';
import CustomersPage from './pages/CustomersPage';
import AboutUs from './pages/AboutUs';
import {Router} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';


import Menu from './components/Menu';


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
        <Menu/>
      </header>
      
      
      
      <main className="App-main">
        <Routes>
          <Route path="/" element={<><BooksPage /><CustomersPage /></>} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </main>

      <footer className="App-footer">
        <p>Simple Book Management App - Educational Project</p>
        <button onClick={() => login({ id: 1, name: "test" })}>Login</button>
        <button onClick={() => readUser()}>Read storage</button>
      </footer>
    </div>
  );
}

export default App;