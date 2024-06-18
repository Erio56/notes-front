import { TCategory } from "../../../Types/Category";
import { TNote } from "../../../Types/Note";
import CategoryName from "../../Atoms/CategoryName/CategoryName";

import "./CategoryList.css";
import { useCategoryContext } from "../../../Context/CategoriesContext";

type CategoryListProps = {
  note: TNote;
  closeModal: () => void;
  handleDeleteCategory: (id: number) => Promise<void>;
  handleAddCategoryToNote: (idNote: number, idCategory: number) => Promise<void>;
  handleRemoveCategoryToNote: (idNote: number, idCategory: number) => Promise<void>;
};

const CategoryList = (props: CategoryListProps) => {


  const { categories } = useCategoryContext();

  const checkIfSelected = (category: TCategory) => {
    return props.note.categories.find((c) => c.id === category.id)
      ? true
      : false;
  };

  const handleCategoryClick = (category: TCategory) => {
    if(checkIfSelected(category)){
      props.handleRemoveCategoryToNote(props.note.id, category.id);
      props.note.categories = props.note.categories.filter(c => c.id !== category.id);
      props.closeModal();
    }else{
      props.handleAddCategoryToNote(props.note.id, category.id)
      props.note.categories = [...props.note.categories, category];
      props.closeModal();
    }
  }

  return (
    <div className="category_list">
      {categories.map((cat) => (
        <CategoryName
          category={cat}
          key={cat.id}
          handleDelete={() => props.handleDeleteCategory(cat.id)}
          isSelected={checkIfSelected(cat)}
          handleClick={() => handleCategoryClick(cat)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
