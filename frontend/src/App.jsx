import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import CustomersPage from "./pages/CustomersPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Menu from "./components/Menu.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import "./App.css";
import { useAuth } from "./context/AuthContext.jsx";

function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function DashboardHome() {
  return (
    <>
      <BooksPage />
      <CustomersPage />
    </>
  );
}

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
        <Menu />
      </header>

      <main className="App-main">
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<DashboardHome />} />
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
        </Routes>
      </main>

      <footer className="App-footer">
        <p>Simple Book Management App - Educational Project</p>
      </footer>
    </div>
  );
}

export default App;
