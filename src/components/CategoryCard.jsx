/* eslint-disable react/prop-types */
import coffee from "../assets/takeawayCoffee.png";
function CategoryCard({ title, thumbnail }) {
    return (
        <div className='category__card'>
            <div className='category__image'>
                
                <img src={thumbnail} alt={title} />
            </div>
            <div className='category'>
                {title}
            </div>
            <div className='category__description'>
                {/* description */}
            </div>
        </div>
    )
}

export default CategoryCard