
import { TCategory } from "../../../Types/Category"
import DeleteCategoryButton from "../DeleteCategoryButton/DeleteCategoryButton"
import "./CategoryName.css"

type CategoryNameProps = {
   category: TCategory,
   isSelected: boolean,
   handleDelete: () => Promise<void>,
   handleClick: () => void
}

const CategoryName = (props: CategoryNameProps) => {

   return( 
      <div className={`category_name ${props.isSelected ? 'selected' : 'deselected'}`} >
         {!props.isSelected && <DeleteCategoryButton text={""} icon={"delete_icon.svg"} handleClick={props.handleDelete}/> }
         <p onClick={props.handleClick}>{props.category.name}</p>
      </div>
   )

}

export default CategoryName;