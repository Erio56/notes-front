
import "./CategoryChip.css"

type CategoryChipProps = {
   name: string
}

const CategoryChip = (props: CategoryChipProps) => {

   return (
      <div className="category_chip">
         <p>{props.name}</p>
      </div>
   )
}

export default CategoryChip;