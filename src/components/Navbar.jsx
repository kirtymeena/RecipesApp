import { Link } from 'react-router-dom'
import { useFetchMealByNameQuery } from "../store/meals-api-slice"
import { useEffect, useState } from "react";

function Navbar() {
    const [name, setName] = useState(null)
    const [selectedSearchQuery, setSelectedSearchQuery] = useState(false)
    const { data, isFetching } = useFetchMealByNameQuery(name);
    const [showDropdown, setDropdown] = useState(false)

    const handleSearchquery = (e) => {
        if (e.target.value.length >=2   ) {
            setName(e.target.value)
        }
        else {
            setName("")
            return
        }

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
            console.log("null")
        }
        console.log("name", name)
    }, [name])

    useEffect(() => {
        console.log("name --", name)
    })


    return (
        <nav className='navbar'>
            <div className='logo'>
                <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" id="chef"><path d="M36 48H12a1 1 0 0 1-.997-.923L9.07 21.946C5.095 21.484 2 18.097 2 14c0-4.419 3.678-8.151 8.032-8.151.91 0 1.803.177 2.636.52C14.072 2.509 18.439 0 24 0c5.224 0 8.878 2.112 11.14 6.45a6.928 6.928 0 0 1 2.828-.602C42.322 5.849 46 9.581 46 14c0 4.097-3.095 7.484-7.07 7.946l-1.933 25.131A1 1 0 0 1 36 48zm-23.074-2h22.147l1.929-25.077c.041-.521.476-.923.998-.923 3.309 0 6-2.691 6-6 0-3.625-3.179-6.151-6.032-6.151-.982 0-1.899.274-2.724.817a.999.999 0 0 1-1.464-.432C31.898 3.981 28.791 2 24 2c-5.157 0-9.059 2.415-9.71 6.009a.998.998 0 0 1-1.533.657 4.876 4.876 0 0 0-2.724-.817C7.179 7.849 4 10.375 4 14c0 3.309 2.691 6 6 6a1 1 0 0 1 .997.923L12.926 46z"></path><path d="M36.625 40h-25.25a1 1 0 1 1 0-2h25.25a1 1 0 1 1 0 2z"></path><path d="M19 40a1 1 0 0 1-1-1v-8a1 1 0 1 1 2 0v8a1 1 0 0 1-1 1zM24 40a1 1 0 0 1-1-1V29a1 1 0 1 1 2 0v10a1 1 0 0 1-1 1zM29 40a1 1 0 0 1-1-1v-8a1 1 0 1 1 2 0v8a1 1 0 0 1-1 1z"></path></svg>
                </Link>
            </div>
            <div className='nav__links'>
                <div className='nav__options'>
                    <div>
                        <Link to="/" className="link fw-400">Recipes</Link>
                    </div>
                </div>
                <div className="nav__search">
                    <input onFocus={() => setSelectedSearchQuery(false)} type="search" onChange={(e) => throttleSearch(e)} className="search__bar" placeholder="Search a Recipe" />
                    {
                        name !== null && name.length >= 3 &&

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
                    }
                </div>
            </div>
        </nav >
    )
}

export default Navbar