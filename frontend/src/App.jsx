import React, { useState } from "react";
import RegistrationPage from "./pages/RegistrationPage";
import BooksPage from "./pages/BooksPage";
import CustomersPage from "./pages/CustomersPage";
import AboutUs from "./pages/AboutUs";
import Menu from "./components/Menu";
import { Routes, Route } from "react-router-dom";
import ContactUs from "./pages/ContactUs";

import "./App.css";

function App() {
  const [registeredUser, setRegisteredUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const handleRegister = (userData) => {
    setRegisteredUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const readUser = () => {
    console.log(localStorage.getItem("user"));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Management System</h1>
        <p>Learn Modularity, Clean Code & Reusability</p>
        <Menu />
      </header>

      <main className="App-main">
        {!registeredUser ? (
          <RegistrationPage onRegister={handleRegister} />
        ) : (
          <Routes>
            <Route path="/" element={<><BooksPage /><CustomersPage /></>} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />

          </Routes>
        )}
      </main>

      <footer className="App-footer">
        <p>Simple Book Management App - Educational Project</p>
        <button onClick={() => handleRegister({ id: 1, name: "test" })}>
          Mock Login
        </button>
        <button onClick={readUser}>Read storage</button>
      </footer>
    </div>
  );
}

export default App;
