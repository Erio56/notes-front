
import "./NoteButton.css"

type NoteButtonProps = {
   text: string,
   icon: string,
   handleClick: ( () => Promise<void> ) | ( () => void ) 
}

const NoteButton = (props: NoteButtonProps) => {

   return (
      <button className="note_button" onClick={props.handleClick}>
         <img src={props.icon} alt={props.text} height={20} width={20} />
      </button>
   )
}

export default NoteButton;