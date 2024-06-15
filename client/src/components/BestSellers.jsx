// BestSellers.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from "./SearchBar"

function BestSellers() {
  const [items, setItems] = useState([]);
  const bestSellerIds = [1, 4, 6, 7, 8, 10, 12]; // Manually specify the best seller item IDs

  
  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => {
        console.log("Items from API:", data);
        const bestSellers = data.filter(item => bestSellerIds.includes(item.id));
        setItems(bestSellers);
      })
      .catch(error => alert(error));
  }, []);

  return (
    <div>
      <h1>Best Sellers</h1>
      
        < SearchBar items = {items} />
        
     
    </div>
  );
}

export default BestSellers;

