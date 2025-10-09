/**
 * Simple App Component
 * 
 * This demonstrates basic React app structure
 */

import React from 'react';
import BooksPage from './pages/BooksPage';
import CustomersPage from './pages/CustomersPage';
import { Link, Route, Routes } from 'react-router-dom';



import './App.css';
import AboutUs from './pages/AboutUs';

function App() {

  const login = (user) =>{
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
        <Link className='btn-primary' to="/">Home</Link> |
        <Link className='btn-primary' to="/books">Books</Link> |
        <Link className='btn-primary' to="/customers">Customers</Link> |
        <Link className='btn-primary' to="/aboutus">About us</Link>
        
      </header>

      <main className="App-main">
        <Routes>
          <Route path="/" element={<><BooksPage /><CustomersPage /></>} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/" element={<><CustomersPage /> <BooksPage /></>} />
        </Routes>
      </main>

      <footer className="App-footer">
        <p>Simple Book Management App - Educational Project</p>
        <button onClick={()=>login({id: 1, name: "test"})}>Login</button>
        <button onClick={()=>readUser()}>Read storage</button>
      </footer>
    </div>
  );
}

export default App;