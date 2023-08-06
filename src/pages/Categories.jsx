import CategoryCard from '../components/CategoryCard'
import { useFetchCategoryQuery } from '../store/meals-api-slice'
import { Link } from 'react-router-dom'
function Categories() {
    const { data, isFetching } = useFetchCategoryQuery()
    return (
        <div>
            <div className='category__header'>
                Popular Categories
                <p>We Provide a variety of food and beverage recipes with high taste</p>
            </div>
            <div className='category__wrapper container'>
                {
                    !isFetching && data.categories.map(category =>
                        <Link to={`${category.strCategory}/list`} key={category.idCategory}>
                            <CategoryCard title={category.strCategory} thumbnail={category.strCategoryThumb} />
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export default Categories