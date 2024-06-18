
import "./DeleteCategoryButton.css";

type NoteButtonProps = {
   text: string,
   icon: string,
   handleClick: () => Promise<void>
}

const DeleteCategoryButton = (props: NoteButtonProps) => {

   return (
      <button className="delete_category_button" onClick={props.handleClick}>
         <img src={props.icon} alt={props.text} height={20} width={20} />
      </button>
   )
}

export default DeleteCategoryButton;