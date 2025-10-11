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

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Management System</h1>
        <p>Learn Modularity, Clean Code & Reusability</p>
      </header>

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
      </footer>
    </div>
  );
}

export default App;
