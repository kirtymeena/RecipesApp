import { useEffect, useState } from "react"
import { useFetchCategoryQuery, useFetchMealByCategoryQuery } from "../store/meals-api-slice"
import { Link, useParams } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
// import Pagination from '@mui/material/Pagination';
import CategoryListCard from "../components/CategoryListCard";
import Loader from "../components/Loader"

function CategoryList() {
    const { category } = useParams();
    // const [count, setCount] = useState();
    const [selectedCategory, setSelectedCategory] = useState('')
    const { data, isFetching } = useFetchCategoryQuery();
    const { data: mealsData, isFetching: isMealFetching } = useFetchMealByCategoryQuery(category);
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (!isFetching) {
    //         setCount(Math.ceil(data.meals.length / 10))
    //     }
    // }, [isFetching])

    useEffect(() => {

    }, [selectedCategory])
    // const handlePagination = (e) => {
    //     if (e.target.tagName) {
    //         console.log(e.target.parentElement.lastChild["data-testid"])
    //     }
    // }

    return (
        <div className='categorgy__list__wrapper'>
            {
                isFetching || isMealFetching ? <Loader /> :
                    <>
                        <div className=" container categoryList__header semi__bold">
                            {
                                !isFetching && data.categories.map(category =>
                                    <Link to={`/${category.strCategory}/list`} key={category.idCategory} className="link" onClick={() => setSelectedCategory(category.strCategory)}>
                                        <CategoryCard title={category.strCategory} thumbnail={category.strCategoryThumb} variant="sm" selectedCategory={selectedCategory} />
                                    </Link>
                                )
                            }
                        </div>
                        <div className="meals__list container">
                            <div className="meal__wrapper">
                                {
                                    !isMealFetching && mealsData.meals.map(meal =>
                                        <div key={meal.idMeal}>
                                            <CategoryListCard thumbnail={meal.strMealThumb} title={meal.strMeal} />
                                        </div>
                                    )

                                }
                            </div>
                            {/* <div className="meal__pagination">
                    <Pagination count={count} color="primary" onChange={(e) => handlePagination(e)} />
                </div> */}
                        </div>
                    </>
            }
        </div>

    )
}

export default CategoryList