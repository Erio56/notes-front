
import "./PrimaryButton.css"

type PrimaryButton = {
   text?: string,
   icon?: string,
   colorHex?: string,
   textColorHex?: string
   iconSize?: number
   handleClick: () => unknown
}

const PrimaryButton = (props: PrimaryButton) => {

   return (
      <button onClick={props.handleClick} className="primary_button" style={{backgroundColor: props.colorHex || "black", color: props.textColorHex || "black"}}>
         {props.icon && <img src={props.icon} alt={props.text} height={props.iconSize || 20}/>}
         {props.text}
      </button>
   )
}


export default PrimaryButton;