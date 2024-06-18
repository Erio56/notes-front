
import "./CreateNoteButton.css"

type CreateNoteButtonProps = {
   handleClick: (content: string) => Promise<void>
}

const CreateNoteButton = (props: CreateNoteButtonProps) => {


   return (
      <div className="create_note_button_wrapper" >
         <div className="create_note_button" onClick={() => props.handleClick('')}>
            <img src="add_icon.svg" alt="add" width={85}/>
         </div>
      </div>
   )
}

export default CreateNoteButton;