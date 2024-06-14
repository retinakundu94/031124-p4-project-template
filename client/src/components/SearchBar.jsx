import React, { useState } from "react";
import Jewelry from "./Jewelry";

export default function SearchBar({ items, userId }) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const filteredItems = items.filter(item => {
        const filteredCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const filteredSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const filteredMinPrice = minPrice === '' || item.price >= parseFloat(minPrice);
        const filteredMaxPrice = maxPrice === '' || item.price <= parseFloat(maxPrice);
        return filteredCategory && filteredSearch && filteredMinPrice && filteredMaxPrice;
    });

    const mappedItems = filteredItems.map(item => {
        return (
            <Jewelry 
                key={item.id} 
                itemId={item.id} 
                userId={userId} 
                name={item.name} 
                price={item.price} 
                image={item.image} 
                category={item.category} 
            />
        );
    });

    return (
        <div className="search-bar-container">
            <div className="filters">
                <section className="searchcontainer">
                    <h3 className="jewelry-sub-header">Search:</h3>
                    <input 
                        className="searchinput" 
                        type="text" 
                        onChange={e => setSearch(e.target.value)} 
                        value={search} 
                        placeholder="Love yourself"
                    />
                </section>

                <section className="searchcontainer">
                    <h3 className="jewelry-sub-header">Select Jewelry Type Here:</h3>
                    <select 
                        className="searchinput" 
                        value={selectedCategory} 
                        onChange={e => setSelectedCategory(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Bracelets">Bracelets</option>
                        <option value="Necklaces">Necklaces</option>
                        <option value="Rings">Rings</option>
                    </select>
                </section>

                <section className="searchcontainer">
                    <h3 className="jewelry-sub-header">Filter by Price Range:</h3>
                    <input 
                        className="searchinput" 
                        type="number" 
                        onChange={e => setMinPrice(e.target.value)} 
                        value={minPrice} 
                        placeholder="Min Price"
                    />
                    <input 
                        className="searchinput" 
                        type="number" 
                        onChange={e => setMaxPrice(e.target.value)} 
                        value={maxPrice} 
                        placeholder="Max Price"
                    />
                </section>
            </div>
            <div className="items-container">
                <section className="jewelry">
                    <div className="jewelry-container">
                        {mappedItems}
                    </div>
                </section>
            </div>
        </div>
    );
}
