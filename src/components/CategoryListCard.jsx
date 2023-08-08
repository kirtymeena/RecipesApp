/* eslint-disable react/prop-types */

function CategoryListCard({ thumbnail, title }) {

  const clipTitle = (title) => {
    if (title.length > 25) {
      return <span title={title}>{title.slice(0, 25)}...</span>
    }
    else {
      return title
    }
  }

  return (
    <div className="categoryList__card">
      <div className="categoryList__image">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="categoryList__title">
        {clipTitle(title)}
      </div>
    </div>
  )
}

export default CategoryListCard