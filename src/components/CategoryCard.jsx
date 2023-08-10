/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";


function CategoryCard({ title, thumbnail, variant }) {
    const { category } = useParams();

    return (
        <div className="card__wrapper" id="scrollRef" >

            <div className={variant ? `category__card-sm ${category === title ? 'green-border' : ''}` : 'category__card'}>
                <div className={variant ? 'category__image-sm' : 'category__image'}>
                    <img src={thumbnail} alt={title} />
                </div>
            </div>
            <div className={variant ? `category__title-sm ${category === title ? 'selected' : ''}` : 'category__title'}>
                {title}
            </div>
        </div >
    )
}

export default CategoryCard