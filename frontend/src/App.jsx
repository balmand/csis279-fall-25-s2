<<<<<<< HEAD
import React, { useState } from "react";
import RegistrationPage from "./pages/RegistrationPage";
import BooksPage from "./pages/BooksPage";
import CustomersPage from "./pages/CustomersPage";
import "./App.css";

function App() {
  // keep track of whether a user has registered
  const [registeredUser, setRegisteredUser] = useState(null);
  

  // this function will be called when registration succeeds
  const handleRegister = (userData) => {
    setRegisteredUser(userData);
  };
=======
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
>>>>>>> 268885e35c11e57de1c1e507865f4693b15af49c

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Management System</h1>
        <p>Learn Modularity, Clean Code & Reusability</p>
        <Menu/>
      </header>
<<<<<<< HEAD

      <main className="App-main">
        {/* if user not registered yet, show registration page */}
        {!registeredUser ? (
          <RegistrationPage onRegister={handleRegister} />
        ) : (
          <>
            {/* Once registered, show your main app */}
            <BooksPage />
            <CustomersPage />
          </>
        )}
      </main>

      <footer className="App-footer">
        <p>Simple Educational Project ©</p>
=======
      
      
      
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
>>>>>>> 268885e35c11e57de1c1e507865f4693b15af49c
      </footer>
    </div>
  );
}

export default App;
