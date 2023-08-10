import { useFetchCategoryQuery, useFetchMealByCategoryQuery } from "../store/meals-api-slice"
import { Link, useParams } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import CategoryListCard from "../components/CategoryListCard";
import Loader from "../components/Loader"

function CategoryList() {
    const { category } = useParams();
    const { data, isFetching } = useFetchCategoryQuery();
    const { data: mealsData, isFetching: isMealFetching } = useFetchMealByCategoryQuery(category);

    return (
        <div className='categorgy__list__wrapper'>
            {
                isFetching || isMealFetching ? <Loader /> :
                    <>
                        <div className="container categoryList__header semi__bold">
                            {
                                !isFetching && data.categories.map(category =>
                                    <Link to={`/${category.strCategory}/list`} key={category.idCategory} className="link" id={category.strCategory}>
                                        <CategoryCard title={category.strCategory} thumbnail={category.strCategoryThumb} variant="sm" />
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

                        </div>
                    </>
            }
        </div>

    )
}

export default CategoryList