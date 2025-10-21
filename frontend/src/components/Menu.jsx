import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Books from '../pages/BooksPage';
import Customers from "../pages/CustomersPage";



export default function App() {
  return (
    <>
      <div>
         <Link className to="/">Home</Link>
        <Link to="/customers">Customers</Link>
          <Link to="/books">Books</Link>
              </div>
              <Link className='btn-primary' to="/">Home</Link> |
              <Link className='btn-primary' to="/books">Books</Link> |
              <Link className='btn-primary' to="/customers">Customers</Link> |
              <Link className='btn-primary' to="/aboutus">About us</Link>
              <Link className='btn-primary' to="/contact">Contact us</Link> ||
              <Link className="btn-primary" to="/checkout">Checkout</Link>

     
  </>
  );
}
