import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import BooksPage from '../pages/BooksPage';
import CustomersPage from "../pages/CustomersPage";

function Home(){
    return ;
}
function Books(){
    return <BooksPage/>;
}

function Customers(){
    return <CustomersPage/>;
}

export default function App() {
  return (
    <>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/books" style={{ marginRight: "10px" }}>Books</Link>
        <Link to="/customers">Customers</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/customers" element={<Customers/>} />
      </Routes>
      </>    
  );
}
