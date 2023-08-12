// import React from 'react'
import Button from '@mui/material/Button';
import Categories from './Categories';

function Home() {
    return (
        <div className='home'>
            <div className="home__wrapper container">
                <div>
                    <h1 className="home__title">Straight From the Kitchen to your heart.</h1>
                    <p className='sub__title'>Want to learn cooking but confused how to start?</p>
                    <p className='sub__title'>No need to worry!</p>

                    <div className="search__option">
                        <Button className='search__btn' variant="contained">Random Recipe</Button>
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