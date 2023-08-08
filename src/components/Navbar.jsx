// import React from 'react'
import logo from "../assets/pineapple.png"
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <nav className='navbar'>
            <div className='logo'>
                <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
            <div className='nav__links'>
                <div className='nav__options'>
                    <div>
                        <Link to="/" className="link">Order Food</Link>
                    </div>
                    <div>
                        <Link to="/" className="link">Recipes</Link>
                    </div>
                </div>
                <div>
                    <input type="search" className="search__bar" placeholder="Search a Recipe"/>
                </div>
                <div className='nav__auth'>
                    <div>
                        <Link to="/" className="link">Login/Sign up</Link>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar