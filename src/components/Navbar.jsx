import * as React from 'react';
import logo from "../assets/pineapple.png"
import { Link, useNavigate } from 'react-router-dom'
import { useFetchMealByNameQuery } from "../store/meals-api-slice"
import { useEffect, useState } from "react";
import RightDrawer from "./RightDrawer";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, showAuth } from "../store/features/authSlice";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import supabase from "../superBaseSetup"

import Fade from '@mui/material/Fade';
function Navbar() {
    const [name, setName] = useState(null)
    const [selectedSearchQuery, setSelectedSearchQuery] = useState(false)
    const { data, isFetching } = useFetchMealByNameQuery(name);
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const displayName = useSelector(state => {
        if (state.auth.userData!==null)
            return state.auth.userData.user_metadata.name
    })

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

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        console.log("logout", error)
        dispatch(getUserData(null))
        navigate("/")
    }


    useEffect(() => {
        if (name === "") {
            setName(null)
        }
    }, [name])
    useEffect(() => {
        console.log(displayName)
    }, [displayName])
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
                    {
                        displayName !== undefined && displayName !== null ?
                            <div>
                                <Button
                                    id="fade-button"
                                    title={displayName}
                                    className='avatar'
                                    aria-controls={open ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <img src="https://media.istockphoto.com/id/1213035740/vector/super-chef-logo-cooking-template-the-hero-proudly-folded-his-paws-funny-panda-character.jpg?s=612x612&w=0&k=20&c=rZ-sGB2nYUoW2GYKxRoqrnlkPMni6GRorVEnVHUTC6c=" alt={displayName} />
                                </Button>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={handleClose} disabled>{displayName}</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={signOut}>Logout</MenuItem>
                                </Menu>
                            </div>
                            :
                            <div>
                                <span className="link" onClick={() => dispatch(showAuth({ showAuthForm: true }))}>
                                    Login/Register
                                </span>
                            </div>

                    }
                </div>
                <div className="hamburger">
                    <RightDrawer />
                </div>
            </div>
        </nav >
    )
}

export default Navbar