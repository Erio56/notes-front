
import "./CategoryModalButton.css"

type CatergoryModalButtonProps = {
   handleClick: () => void
}

const CatergoryModalButton = (props: CatergoryModalButtonProps) => {
   
   return (
      <div className="category_modal_button" onClick={props.handleClick}>
         <img src="close_icon.svg" alt="close button" width={45}/>
      </div>
   )
}

export default CatergoryModalButton;