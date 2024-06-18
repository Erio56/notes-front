import "./SelectCategory.css"
import { TCategory } from "../../../Types/Category"

type SelectInputProps = {
  categories: TCategory[],
  selectedCat: number | null,
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectInput = (props: SelectInputProps) => {

   return (
    <div className="custom_select_wrapper">
      <select className="custom_select" onChange={props.handleSelect} value={props.selectedCat || ""}>
      <option value="">All Categories</option>
      {props.categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
      </select>
    </div>
   )  
}

export default SelectInput;