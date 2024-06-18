import { useEffect } from "react";
import {
  createCategory,
  deleteCategory,
} from "../../../API/CategoryAPI";
import CatergoryModalButton from "../../Atoms/CategoryModalButton/CategoryModalButton";
import CategoryList from "../../Molecules/CategoryList/CategoryList";
import CategoryRegister from "../../Molecules/CategoryRegister/CategoryRegister";
import "./CategoriesModal.css";
import { TNote } from "../../../Types/Note";
import { useCategoryContext } from "../../../Context/CategoriesContext";

type CategoryModalProps = {
  handleClose: () => void,
  note: TNote,
  handleAddCategory: (idNote: number, idCategory: number) => Promise<void>,
  handleRemoveCategory: (idNote: number, idCategory: number) => Promise<void>
}

const CategoryModal = (props: CategoryModalProps) => {

  const { refreshCategories } = useCategoryContext();

  const handleNewCategory = async (name: string) => {
    await createCategory(name);
    refreshCategories();
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      refreshCategories()
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <div className="modal_background">
        <div className="modal_wrapper">
            <div className="modal_header">
              <div className="title_wrapper">
                <div className="title">
                  <p>Add category</p>
                </div>
                <CatergoryModalButton handleClick={props.handleClose}/>
              </div>
              <div className="modal_content">
                <CategoryList
                  closeModal={props.handleClose}
                  note={props.note}
                  handleDeleteCategory={handleDeleteCategory}
                  handleAddCategoryToNote={props.handleAddCategory} 
                  handleRemoveCategoryToNote={props.handleRemoveCategory}                
                />
              </div>
            </div>
            <div className="modal_footer">
              <CategoryRegister handleNewCategory={handleNewCategory}/>
            </div>
          </div>
          <div className="modal_background2 " onClick={props.handleClose}></div>
      </div>
      
    </>
  );
};

export default CategoryModal;
