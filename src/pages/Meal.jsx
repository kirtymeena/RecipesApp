import { useEffect, useState } from "react";
import { useFetchMealByIdQuery } from "../store/meals-api-slice"
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import coffeeMug from "../assets/takeawayCoffee.png"


function Meal() {
    const { id } = useParams();
    const { data, isFetching } = useFetchMealByIdQuery(id);
    const [emabedId, setEmbedId] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [measures, setmeasures] = useState([]);

    useEffect(() => {
        console.log(data)
        getEmbedId()
        getIngredients()
        console.log(ingredients)
    }, [!isFetching])






    const getEmbedId = () => {
        if (data !== undefined) {
            console.log(data.meals[0].strYoutube.split("=")[1])
            setEmbedId(data.meals[0].strYoutube.split("=")[1])
        }
    }

    const getIngredients = () => {
        let ingredientsList = []
        let measureList = []
        if (data !== undefined) {
            for (let i in data.meals[0]) {
                if (i.includes("strIngredient") && data.meals[0][i] !== "" && data.meals[0][i] !== null) {
                    ingredientsList.push(data.meals[0][i])

                }
                if (i.includes("strMeasure") && data.meals[0][i] !== "" && data.meals[0][i] !== null) {
                    measureList.push(data.meals[0][i])
                }

            }
            console.log(ingredientsList, measureList)
        }

        setIngredients(ingredientsList)
        setmeasures(measureList);
    }

    const getRecipe = () => {
        return data.meals[0].strInstructions.split(".");
    }

    return (
        isFetching ?
            <div className="loader">
                <Loader />
            </div> :

            data !== undefined ?

                <div className="details__wrapper container" >
                    <div className="instructions">
                        <p className="meal-title">{data.meals[0].strMeal}</p>

                        <div className="meal__image">
                            <img src={data.meals[0].strMealThumb} alt="meal" />
                        </div>
                        <div>
                            <p className="meal__sub">Jump to recipe</p>
                            <ul className="instruction__list">
                                {
                                    getRecipe().filter(recipe => recipe !== "").map((recipe, idx) =>
                                        <li key={idx}> {recipe}.</li>
                                    )
                                }
                            </ul>
                            <div className="youtube__video">
                                <iframe
                                    width="100%"
                                    height="400"
                                    src={`https://www.youtube.com/embed/${emabedId}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={data.meals[0].strMeal}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sidebar">
                        <div className="info__card">
                            <ul className="info__list">
                                <li className="info">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="32" height="32" id="cloche"><circle cx="32" cy="22" r="3"></circle><path d="M4 53a1 1 0 0 0 1 1H59a1 1 0 0 0 1-1V52H4zM56.98 50A25 25 0 0 0 7.02 50h3.01a21.983 21.983 0 0 1 2.59-9.42l1.76.95A20.044 20.044 0 0 0 12.03 50zM52 47h2v2H52zM42 47h8v2H42zM14.159 38.125c.342-.473.705-.935 1.08-1.375l1.522 1.3q-.515.6-.981 1.249zM13.751 16.661C15.312 14.887 17.08 12.877 17.08 9h-2c0 3.123-1.311 4.613-2.831 6.339C10.688 17.113 8.92 19.123 8.92 23h2C10.92 19.877 12.231 18.387 13.751 16.661zM18.92 23c0-3.123 1.311-4.613 2.831-6.339C23.312 14.887 25.08 12.877 25.08 9h-2c0 3.123-1.311 4.613-2.831 6.339C18.688 17.113 16.92 19.123 16.92 23zM44.751 16.661C46.312 14.887 48.08 12.877 48.08 9h-2c0 3.123-1.311 4.613-2.831 6.339C41.688 17.113 39.92 19.123 39.92 23h2C41.92 19.877 43.231 18.387 44.751 16.661zM49.92 23c0-3.123 1.311-4.613 2.831-6.339C54.312 14.887 56.08 12.877 56.08 9h-2c0 3.123-1.311 4.613-2.831 6.339C49.688 17.113 47.92 19.123 47.92 23z"></path></svg>
                                    </div>
                                    <div>
                                        <span>Category :</span> <span>{data.meals[0].strCategory}</span>

                                    </div>
                                </li>
                                <li className="info">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" enableBackground="new 0 0 48 48" viewBox="0 0 48 48" id="location"><path d="M24,2C14.63,2,7,9.63,7,19c0,8.8,13.92,24.57,15.51,26.34C22.89,45.76,23.43,46,24,46s1.11-0.24,1.49-0.66
                                        C27.08,43.57,41,27.8,41,19C41,9.63,33.37,2,24,2z M24,40.95C19.35,35.47,11,24.5,11,19c0-7.17,5.83-13,13-13s13,5.83,13,13
                                        C37,24.5,28.65,35.47,24,40.95z"></path><path d="M24,8c-6.07,0-11,4.93-11,11s4.93,11,11,11s11-4.93,11-11S30.07,8,24,8z M24,26c-3.86,0-7-3.14-7-7s3.14-7,7-7s7,3.14,7,7
                                        S27.86,26,24,26z"></path></svg>
                                    </div>
                                    <div>
                                        <span>Area : </span> <span>{data.meals[0].strArea}</span>

                                    </div>
                                </li>
                                <li className="info">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 2" width="27" height="27" viewBox="0 0 35 35" id="tag"><path d="M18.77,34.75A5.33,5.33,0,0,1,15,33.21L1.79,20A5.39,5.39,0,0,1,.26,15.87l.57-9.2A6.3,6.3,0,0,1,6.67.83l9.2-.57A5.44,5.44,0,0,1,20,1.79L33.21,15a5.79,5.79,0,0,1-.31,8.16h0L23.13,32.9A6.16,6.16,0,0,1,18.77,34.75Zm-2.54-32H16l-9.21.56a3.83,3.83,0,0,0-3.5,3.5L2.76,16a2.85,2.85,0,0,0,.8,2.24L16.74,31.44a2.9,2.9,0,0,0,2.19.81,3.69,3.69,0,0,0,2.43-1.12l9.78-9.77a3.3,3.3,0,0,0,.3-4.62L18.26,3.56A2.81,2.81,0,0,0,16.23,2.75ZM32,22.25h0Z"></path><path d="M11.48,15.73a4.25,4.25,0,0,1-4.25-4.25,4.25,4.25,0,0,1,7.26-3,4.25,4.25,0,0,1-3,7.25Zm0-6a1.75,1.75,0,0,0-1.24,3,1.8,1.8,0,0,0,2.48,0,1.76,1.76,0,0,0,0-2.48h0A1.74,1.74,0,0,0,11.48,9.73Z"></path></svg>
                                    </div>
                                    <div>
                                        <span> Tag : </span> <span>{data.meals[0].strTags}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="info__card no-bg">
                            <ul className="info__list">
                                {
                                    ingredients.map((ingredient, idx) =>
                                        <li key={ingredient} className="info">
                                            <span>{ingredient} : </span>  <span>  {measures[idx]}</span>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div >
                :
                <div className="display__error">
                    unable to fetch meal details
                    <img src={coffeeMug} alt="mug" />
                </div>



    )
}

export default Meal