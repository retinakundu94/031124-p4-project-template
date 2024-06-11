import React, { useState, useEffect} from "react"
import SearchBar from "./SearchBar"

function JewelryContainer({}){

    const URL = '/api/items'
    
    const[items, setItems] = useState([])

    useEffect(() => {
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            console.log("Items from API:", data);
            setItems(data);
          })
        .catch(error => alert(error))
    }, [])

    return (
        <div >
            <SearchBar items ={items}/>   
        </div>
    )
}

export default JewelryContainer