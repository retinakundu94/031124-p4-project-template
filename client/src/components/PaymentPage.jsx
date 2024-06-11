import React from 'react';
import PaymentForm from './PaymentForm'
import { useState, useEffect } from 'react';

function PaymentPage() {
    const [cartItems, setCartItems] = useState([])
    const [toggle, setToggle] = useState(false)
    const [jewelryImages, setJewelryImages] = useState([]);


    useEffect(()=>{
        fetch('/api/carts') 
        .then(res=>{
            if (res.ok){
                return res.json()
            }
            else {
                throw new Error ('Your cart is currently empty.')
            }
        })
        .then(data=>{
            setCartItems(data);
            setJewelryImages(jewelryImages => [])
            data.map(item => setJewelryImages(jewelryImages => [...jewelryImages, item.item.image]))
        })
        .catch(error=>{
            setError(error.message)
        })
    }, [])

    const totalAmount = cartItems.reduce((acc, cartItem) => acc + cartItem.item.price, 0);
    console.log(jewelryImages)
    return (
        <div>
            <h1 className='cartPage'>Checkout:</h1>
            <h2 className='cartPage'>Total Amount: ${totalAmount.toFixed(2)}</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.item.name} - ${item.item.price.toFixed(2)}
                    </li>
                ))}
            </ul>
            {toggle ? <JewelryContainer jewelryImages={jewelryImages}/> : <PaymentForm amount={totalAmount} setToggle={setToggle}/> }
        </div>
    );
}

export default PaymentPage;
