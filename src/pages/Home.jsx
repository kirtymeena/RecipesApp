// import React from 'react'
import Button from '@mui/material/Button';
import Categories from './Categories';

import { useRef, useState } from 'react';
function Home() {
    const [showAlert, setShowAlert] = useState(true)
    const refCategory = useRef();



    const scrollToCategory = () => {
        refCategory.current.scrollIntoView({ behavior: "smooth" });
    }


    return (
        <div className='home'>

            <div className="home__wrapper container">

                <div>
                    <h1 className="home__title">Making Food Great Again And Again</h1>
                    <p className='sub__title'>Want to learn cooking but confused how to start?</p>
                    <p className='sub__title'>No need to worry!</p>

                    <div className="search__option-flex">
                        <div>
                            <Button className='search__btn' variant="outlined">Random Recipe</Button>
                        </div>
                    </div>
                </div>

            </div>
            <div className='cateogry__section' ref={refCategory}>
                <Categories />
            </div>

        </div>
    )
}

export default Home