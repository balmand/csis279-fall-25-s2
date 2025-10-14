import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Menu() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="menu">
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <>
          <Link to="/books">Books</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/aboutus">About us</Link>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
