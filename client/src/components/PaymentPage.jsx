import React from 'react';
import PaymentForm from './PaymentForm';
import { useState, useEffect } from 'react';

function PaymentPage() {
  const [cartItems, setCartItems] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetch('/api/carts')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Your cart is currently empty.');
        }
      })
      .then(data => {
        setCartItems(data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  const totalAmount = cartItems.reduce((acc, cartItem) => acc + cartItem.item.price, 0);

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
      {toggle ? (
        <div>
          <h1>Order Confirmed!</h1>
        </div>
      ) : (
        <PaymentForm 
          amount={totalAmount} 
          setToggle={setToggle} 
          userName={userName} 
          setUserName={setUserName} 
        />
      )}
    </div>
  );
}

export default PaymentPage;
