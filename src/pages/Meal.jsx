import { useEffect, useState } from "react";
import { useFetchMealByIdQuery } from "../store/meals-api-slice"
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import coffeeMug from "../assets/takeawayCoffee.png"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
function Meal() {
    const { id } = useParams();
    const { data, isFetching } = useFetchMealByIdQuery(id);
    const [emabedId, setEmbedId] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [measures, setmeasures] = useState([])
    useEffect(() => {
        console.log(data)
        getEmbedId()
        getIngredients()
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
                if (i.includes("strIngredient") && data.meals[0][i] !== "") {
                    ingredientsList.push(data.meals[0][i])

                }
                if (i.includes("strMeasure")) {
                    measureList.push(data.meals[0][i])
                }

            }
        }

        setIngredients(ingredientsList)
        setmeasures(measureList);
    }
    return (
        isFetching ?
            <div className="loader">
                <Loader />
            </div> :

            data !== undefined ?

                <div className="details__wrapper container" >
                    <div className="title">
                        {data.meals[0].strMeal}
                    </div>
                    <div className="youtube__video">
                        <iframe
                            width="800"
                            height="400"
                            src={`https://www.youtube.com/embed/${emabedId}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={data.meals[0].strMeal}
                        />

                    </div>
                    <div className="meal__details">

                        <div className="ingredients">
                            <h3 className="ingredients__title">Ingredients</h3>
                            <div className="ingredient__name">
                                <ul className="ingredient__list">
                                    {
                                        ingredients.map((ingredient, idx) =>
                                            <li key={ingredient}>
                                                <div>
                                                    {ingredient}
                                                </div>
                                                <div>
                                                    {measures[idx]}
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>

                        </div>
                        <div className="instrcutions">
                            <div className="meal__image">
                                {/* <FavoriteBorderOutlinedIcon/> */}
                                <img src={data.meals[0].strMealThumb} alt="meal" />
                            </div>
                            <div className="instruction__text" dangerouslySetInnerHTML={{ __html: data.meals[0].strInstructions }}>

                            </div>
                        </div>
                    </div>
                </div > :
                <div className="display__error">
                    unable to fetch meal details
                    <img src={coffeeMug} alt="mug" />
                </div>



    )
}

export default Meal