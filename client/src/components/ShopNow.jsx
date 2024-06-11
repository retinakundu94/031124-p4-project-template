import React from "react"
import JewelryContainer from "./JewelryContainer"

function ShopNow({userId}){
    
    return (
        <div className="shopnow">
            <h1 className="header-shopNow">Shop Now</h1>
            <JewelryContainer userId={userId}/>
        </div>
    )
}

export default ShopNow