/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

function CategoryCard({ title, thumbnail, variant }) {
    const { category } = useParams();
    let refScroll = useRef();

    useEffect(() => {
        if (!refScroll.current) return;
        refScroll.current.scrollIntoView({ behavior: "smooth" })

    },[])

    return (
        <div className="card__wrapper" ref={category === title ? refScroll : null} id={`${category === title ? "scrollRef" : ""} `} >

            <div className={variant ? `category__card-sm ${category === title ? 'green-border' : ''} ` : 'category__card'}>
                <div className={variant ? 'category__image-sm' : 'category__image'}>
                    <img src={thumbnail} alt={title} />
                </div>
            </div>
            <div className={variant ? `category__title-sm ${category === title ? 'selected' : ''} ` : 'category__title'}>
                {title}
            </div>
        </div >
    )
}

export default CategoryCard