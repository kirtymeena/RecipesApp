// import React from 'react'
import logo from "../assets/pineapple.png"
import { Link } from 'react-router-dom'
import { useFetchMealByNameQuery } from "../store/meals-api-slice"
import { useEffect, useState } from "react";
function Navbar() {
    const [name, setName] = useState(null)
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
        console.log(isFetching, name)
        if (!isFetching) {
            console.log(data)
        }
        if (name === "") {
            setName(null)
        }
    }, [isFetching, name])
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
                    <input type="search" value={name} onChange={throttleSearch} className="search__bar" placeholder="Search a Recipe" />
                    <div className="search__result">
                        {
                            !isFetching && data.meals !== null && data.meals.map(result =>
                                <div className="meal__search" key={result.idMeal}>
                                    {result.strMeal}
                                    <div>
                                        <img src={result.strMealThumb} alt="meal" />
                                    </div>
                                </div>
                            )
                        }
                    </div>
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