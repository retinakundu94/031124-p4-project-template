import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-links">
                <Link className="footer_inner" to="/">Home</Link>
                <Link className="footer_inner" to="/cart">Cart</Link>
                <Link className="footer_inner" to="/shopnow">Shop Now</Link>
                <Link className="footer_inner" to="/bestsellers">Best Sellers</Link> 
               
                <Link className="footer_inner" to="/blog">Blog</Link>

                <Link className="footer_inner" to="/contact">Contact</Link>
               
                <Link className="footer_inner" to="/userPanel">Login</Link>
            </div>
        </div>
    );
}
