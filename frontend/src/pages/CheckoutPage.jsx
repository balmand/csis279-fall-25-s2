import { useEffect, useState } from "react";

const CheckoutPage = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const selectedCart = JSON.parse(localStorage.getItem("cart"));
        setCart(selectedCart);
        let t = 0;
        for(let i = 0; i < selectedCart.length; i++){
            t += Number(selectedCart[i].price);
        }
        setTotal(t);
    }, []);

    const cancelPurchase = () => {
        localStorage.removeItem("cart");
        setCart([]);
    }

    const removeItem = (id) =>{
        let itemsToKeep = [];
        const selectedCart = JSON.parse(localStorage.getItem("cart"));
        for(let i = 0; i < selectedCart.length; i++)
        {
            if(selectedCart[i].id != id){
                itemsToKeep.push(selectedCart[i])
            }
        }
        setCart(itemsToKeep);
        localStorage.setItem("cart", JSON.stringify(itemsToKeep))
    }
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Author
                        </th>
                        <th>
                            Year
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Del.
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (cart) ? 
                        cart.map((book, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {book.title}
                                    </td>
                                    <td>
                                        {book.author}
                                    </td>
                                    <td>
                                        {book.year}
                                    </td>
                                    <td>
                                        {book.price}
                                    </td>
                                    <td>
                                        <button onClick={() => removeItem(book.id)} className="btn btn-danger" >-</button>
                                    </td>
                                </tr>
                            )
                        }) : <tr><td colSpan={4}>No books found</td></tr>
                    }
                </tbody>
            </table>
            <h3>Tot<b>a</b>l: <span style={{color: "red"}}>{total}</span></h3>
            <div className="row">
                <div className="col-1">
                    <button className="btn btn-success">
                        BUY
                    </button>
                </div>
                <div className="col-1">
                    <button className="btn btn-danger" onClick={() => cancelPurchase()}>
                        CANCEL
                    </button>

                </div>

            </div>
        </>
    )
}

export default CheckoutPage;