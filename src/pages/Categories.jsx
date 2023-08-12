import CategoryCard from '../components/CategoryCard'
import { ERROR_CATEGORIES } from '../constants'
import { useFetchCategoryQuery } from '../store/meals-api-slice'
import { Link } from 'react-router-dom'

function Categories() {
    const { data, isFetching } = useFetchCategoryQuery()
    return (

        data !== undefined ?

            <div>
                <div className='category__header'>
                    Popular Categories
                    <p className='sub__header'>We Provide a variety of food and beverage recipes with high taste</p>
                </div>
                <div className='category__wrapper container'>
                    {
                        !isFetching && data.categories.map(category =>
                            <Link to={`${category.strCategory}/list`} key={category.idCategory} className='link'>
                                <CategoryCard title={category.strCategory} thumbnail={category.strCategoryThumb} />
                            </Link>
                        )
                    }
                </div>
            </div>

            :
            <div className="display__error">
                {ERROR_CATEGORIES}
            </div>


    )
}

export default Categories