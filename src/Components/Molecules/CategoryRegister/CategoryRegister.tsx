import { useState } from "react"
import CategoryButton from "../../Atoms/CategoryButton/CategoryButton"
import CategoryInput from "../../Atoms/CategoryInput/CategoryInput"
import "./CategoryRegister.css"

type CategoryRegisterProps = {
   handleNewCategory: (name: string) => Promise<void>
}

const CategoryRegister = (props: CategoryRegisterProps) => {

   const [name, setName] = useState('')  

   const handleNewCategoryClick = () => {
      if(name){
         props.handleNewCategory(name);
         setName('');
      }
   }

   return (
      <div className="category_register">
         <CategoryInput nameValue={name} handleChange={setName} />
         <CategoryButton handleClick={handleNewCategoryClick}/>
      </div>
   )
}

export default CategoryRegister;