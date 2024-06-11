import React, {useState, useEffect}  from "react"
import { Link } from "react-router-dom";
import Jewelry from "./Jewelry"

export default function CartPage(){

    const [error, setError] = useState(null)
    const [cartItems, setCartItems] = useState([])

    useEffect(()=>{
        fetch('/api/carts') 
        .then(res=>{
          console.log("Fetch response:", res);
            if (res.ok){
                return res.json()
            }
            else {
                throw new Error ('Your cart is empty.')
            }
        })
        .then(data=>{
            console.log("Fetched data:", data);
            setCartItems(data)
            console.log(data)

        })
        .catch(error=>{
            setError(error.message)
        })
    }, [])
    console.log("cartitems: ",cartItems)

    const handleDelete = (itemId) => {
        console.log("Deleting item with ID:", itemId);
        fetch(`/api/carts/${itemId}`, {
          method: 'DELETE',
        })
          .then(res => {
            console.log("Delete response:", res);
            if (res.ok) {
              setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
            } else {
              throw new Error('Failed to delete item');
            }
          })
          .catch(error => {
            setError(error.message);
          });
      };

      const totalAmount = cartItems.reduce((acc, cartItem) => acc + cartItem.item.price, 0);
        

      const mappedCartItems = cartItems.map(cartItem => (
        <Jewelry
          key={cartItem.id}
          name={cartItem.item.name}
          price={cartItem.item.price}
          image={cartItem.item.image}
          category={cartItem.item.category}
          itemId={cartItem.id}
          onDelete={handleDelete}
          inCart={true}
        />
      ));


      return (
        <div >
            <h1 className="cartPage">Your Cart:</h1>
            <Link to="/payment">
                <button className="btn-process">Proceed to Payment</button>
            </Link>
            <div className="jewelry-container">
                {error && <p className="error">{error}</p>}
                {mappedCartItems}
            </div>
        </div>
      );
    }
    
     
