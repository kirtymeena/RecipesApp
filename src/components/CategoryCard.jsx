/* eslint-disable react/prop-types */
function CategoryCard({ title, thumbnail, variant, selectedCategory }) {
    return (
        <div className="card__wrapper" id="scrollRef" >

            <div className={variant ? `category__card-sm ${selectedCategory == title ? 'green-border' : ''}` : 'category__card'}>
                <div className={variant ? 'category__image-sm' : 'category__image'}>
                    <img src={thumbnail} alt={title} />
                </div>
            </div>
            <div className={variant ? `category__title-sm ${selectedCategory == title ? 'selected' : ''}` : 'category__title'}>
                {title}
            </div>
        </div >
    )
}

export default CategoryCard