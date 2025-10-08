/**
 * Simple App Component
 * 
 * This demonstrates basic React app structure
 */

import React from 'react';
import BooksPage from './pages/BooksPage';
import CustomersPage from './pages/CustomersPage';
import ForgetPasswordForm from './components/ForgetPasswordForm';
import ResetPasswordForm from './components/ResetPasswordForm';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Book Management System</h1>
        <p>Learn Modularity, Clean Code & Reusability</p>
      </header>
      
      <main className="App-main">
        <BooksPage />
        <CustomersPage />
        
        {/* test sections for forget password feature */}
        <div style={{border: '2px solid #007bff', margin: '20px', padding: '20px', borderRadius: '8px'}}>
          <h3>forget password testing</h3>
          <ForgetPasswordForm />
        </div>
        
        <div style={{border: '2px solid #28a745', margin: '20px', padding: '20px', borderRadius: '8px'}}>
          <h3>reset password testing</h3>
          <ResetPasswordForm />
        </div>
      </main>
      
      <footer className="App-footer">
        <p>Simple Book Management App - Educational Project</p>
      </footer>
    </div>
  );
}

export default App;