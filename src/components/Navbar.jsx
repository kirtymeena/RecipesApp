// import React from 'react'
import logo from "../assets/pineapple.png"
import { Link } from 'react-router-dom'
import { useFetchMealByNameQuery } from "../store/meals-api-slice"
import { useEffect, useState } from "react";
import RightDrawer from "./RightDrawer";
import { signInWithGoogle } from "../firebase";

function Navbar() {
    const [name, setName] = useState(null)
    const [selectedSearchQuery, setSelectedSearchQuery] = useState(false)
    const { data, isFetching } = useFetchMealByNameQuery(name);

    const handleSearchquery = (e) => {
        setName(e.target.value)
    }

    function throttle(cb, delay) {
        let shouldwait = false;
        let waitingArgs;
        const timeout = setTimeout(() => {
            if (waitingArgs == null) {
                shouldwait = false
            }
            else {
                cb(...waitingArgs)
                waitingArgs = null
                setTimeout(timeout, delay)
            }
        }, delay)
        return (...args) => {
            if (shouldwait) {
                waitingArgs = args;
                return
            }
            cb(...args)
            shouldwait = true
            setTimeout(timeout, delay)

        }
    }

    const throttleSearch = throttle(handleSearchquery, 300)

    useEffect(() => {
        if (name === "") {
            setName(null)
        }
    }, [name])
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
                <div className="nav__search">
                    <input onFocus={() => setSelectedSearchQuery(false)} type="search" value={name} onChange={throttleSearch} className="search__bar" placeholder="Search a Recipe" />
                    <div className="search__result">
                        {
                            !isFetching && data.meals !== null && data.meals.map(result =>
                                <Link style={{ display: selectedSearchQuery ? "none" : "" }} onClick={() => setSelectedSearchQuery(true)} to={`/${result.strCategory}/${result.strMeal}/${result.idMeal}`} key={result.idMeal} className="link">
                                    <div className="meal__search" >
                                        {result.strMeal}
                                        <div>
                                            <img src={result.strMealThumb} alt="meal" />
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                </div>
                <div className='nav__auth'>
                    <div>
                        <Link to="/auth" className="link">Login/Sign up</Link>
                    </div>

                </div>
                <div className="hamburger">
                    {/* <MenuIcon /> */}
                    <RightDrawer />
                </div>
            </div>
        </nav>
    )
}

export default Navbar