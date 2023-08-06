import { useEffect, useState } from "react"
import { useFetchMealByCategoryQuery } from "../store/meals-api-slice"
import { useParams } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import Pagination from '@mui/material/Pagination';

function CategoryList() {
    const { category } = useParams();
    const [count, setCount] = useState();
    const { data, isFetching } = useFetchMealByCategoryQuery(category)
    useEffect(() => {
        if (!isFetching) {
            setCount(Math.ceil(data.meals.length / 10))
        }
    }, [isFetching])

    const handlePagination = (e) => {
        if (e.target.tagName) {
            console.log(e.target.parentElement.lastChild["data-testid"])
        }
    } 
    
    return (
        <div className='container categorgy__list__wrapper'>
            <div className="categoryList__header semi__bold">
                <p className="semi__bold">{category}</p>
            </div>
            <div className="meals__list">
                <div className="meal__wrapper container">
                    {
                        !isFetching && data.meals.slice(0, 10).map(meal =>
                            <div key={meal.idMeal}>
                                <CategoryCard title={meal.strMeal} thumbnail={meal.strMealThumb} />
                            </div>
                        )

                    }
                </div>
                <div className="meal__pagination">
                    <Pagination count={count} color="primary" onChange={(e) => handlePagination(e)} />
                </div>
            </div>
        </div>
    )
}

export default CategoryList