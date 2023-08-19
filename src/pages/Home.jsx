// import React from 'react'
import Button from '@mui/material/Button';
import Categories from './Categories';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
function Home() {
    const displayName = useSelector(state => state.auth.userData !== null ? state.auth.userData.user_metadata.name : "")

    const LoginAlert = () => {
        return (

            <Alert severity="success" sx={{ position: "absolute", zIndex: "100", width: "40%", right: 0 }}>
                <AlertTitle>Welcome {displayName}</AlertTitle>
                You're logged in successfully!
            </Alert>
        )
    }


    useEffect(() => {
        console.log(displayName)
        return () => LoginAlert

    }, [])

    return (
        <div className='home'>

            <div className="home__wrapper container">
                {
                    displayName !== "" && LoginAlert()
                }
                <div>
                    <h1 className="home__title">Making Food Great Again And Again</h1>
                    <p className='sub__title'>Want to learn cooking but confused how to start?</p>
                    <p className='sub__title'>No need to worry!</p>

                    <div className="search__option-flex">
                        <div>
                            <Button className='search__btn' variant="outlined">Random Recipe</Button>
                        </div>
                        <div>

                            <Button className='search__btn' variant="outlined">Order Food</Button>
                        </div>
                    </div>
                </div>

            </div>
            <div className='cateogry__section'>
                <Categories />
            </div>

        </div>
    )
}

export default Home