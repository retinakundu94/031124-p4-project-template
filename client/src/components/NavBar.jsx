import {NavLink, Link} from 'react-router-dom'


export default function NavBar({ currentUser }){
    
    return(
        
        <div>
            <nav>
            <div className="container nav-container">
                    <Link className="nav-link" to='/'>Home</Link>
                    
                    <NavLink className="nav-link" to='/cart'>Cart</NavLink>
                   
                    <NavLink className="nav-link" to='/shopnow'>ShopNow</NavLink>

                    <NavLink className="nav-link" to='/blog'>Blog</NavLink> 

                    <NavLink className="nav-link" to='/bestsellers'>Best Sellers</NavLink>

                    <NavLink className="nav-link" to='/contact'>Contact</NavLink> 


                    
                    <div className="user-info">
                        {currentUser ? (
                            <span className="welcome">Welcome, {currentUser.username}!</span>
                        ) : (
                            <Link className="nav-link" to="/userPanel">Login</Link>
                        )}
                    </div>
                    
                </div>
            </nav>
        </div>
    )
}

