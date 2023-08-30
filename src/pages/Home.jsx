// import React from 'react'
import { useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Categories from './Categories';
import { useFetchRandomMealQuery } from "../store/meals-api-slice"
import { useNavigate } from 'react-router-dom';

function Home() {
    const refCategory = useRef();
    const navigate = useNavigate()
    const { data: randomMeal, isFetching: fetchRandomMeal } = useFetchRandomMealQuery();
    useEffect(() => {
        console.log("randomMeal", !fetchRandomMeal && randomMeal.meals[0])
    })

    return (
        <div className='home'>

            <div className="home__wrapper container">

                <div>
                    <h1 className="home__title">Making Food Great Again And Again</h1>
                    <p className='sub__title'>Want to learn cooking but confused how to start?</p>
                    <p className='sub__title'>No need to worry!</p>

                    <div className="search__option-flex">
                        <div>
                            <Button className='search__btn' variant="outlined" onClick={() => !fetchRandomMeal && navigate(`/${randomMeal.meals[0].strCategory}/${randomMeal.meals[0].strMeal}/${randomMeal.meals[0].idMeal}`)}>Random Recipe</Button>
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