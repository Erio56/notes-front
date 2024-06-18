
import "./CategoryButton.css"

type CategoryButtonPorps = {
   handleClick: () => void
}

const CategoryButton = (props: CategoryButtonPorps) => {

   return (
      <button className="category_button" onClick={props.handleClick}>Save</button>
   )
}

export default CategoryButton;