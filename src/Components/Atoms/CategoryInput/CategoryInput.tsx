import { Dispatch, SetStateAction } from "react";
import "./CategoryInput.css";

type CategoryInput = {
  nameValue: string;
  handleChange: Dispatch<SetStateAction<string>>;
};

const CategoryInput = (props: CategoryInput) => {
  return (
    <input
      className="category_input"
      type="text"
      value={props.nameValue}
      onChange={(e) => props.handleChange(e.target.value)}
    />
  );
};
export default CategoryInput;
