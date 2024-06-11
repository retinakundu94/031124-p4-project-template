import React from "react"
import { Link } from "react-router-dom"

export default function Footer(){
    return (
        <div className="footer">
            <div className="footer-links">
                <Link className="footer_inner" to="/">Home</Link>
                <Link className="footer_inner" to="/cart">Cart</Link>
                <Link className="footer_inner" to="/shopnow">Shop Now</Link>
                <Link className="footer_inner" to="/userPanel">Login</Link>
                <Link className="footer_inner" to="/userPanel">Blog</Link>
            </div>
        </div>
    )
}

