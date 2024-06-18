import { Dispatch, SetStateAction } from "react";
import "./NoteContent.css"

type NoteProps = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
};

const NoteContent = (props: NoteProps) => {

   const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      props.setContent(evt.target.value);
   };

   return (
      <div>
         <textarea
            onChange={handleChange}
            value={props.content}
            className="text_container"
         />
      </div>
   );
};

export default NoteContent;
