import axios from "axios";
import { useEffect, useState } from "react"

const BooksTable = () =>{
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        retrieveBooks();
    }, []);

    const retrieveBooks = async() =>{
        setLoading(true);
        try{
            const response = await axios.get("http://localhost:4000/api/books");
            if(response.status === 200){
                setBooks(response.data);
            }
            
        }catch(e){
            alert("Error retrieving books: " + e.message);
        } finally {
            setLoading(false);
        }
    }
    
    return(
        <div>
            <h2>Books Table</h2>
            {loading && <p>Loading books...</p>}
            <table className="table">            
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((book)=>{
                            return(
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.year}</td>
                                    <td>${book.price}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default BooksTable;