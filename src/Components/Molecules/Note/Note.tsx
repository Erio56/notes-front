import { useState } from "react";
import { TNote } from "../../../Types/Note";
import NoteContent from "../../Atoms/NoteContent/NoteContent";
import NoteButton from "../../Atoms/NoteButton/NoteButton";

import "./Note.css";
import CategoryModal from "../../Organism/CategoriesModal/CategoriesModal";
import CategoryChip from "../../Atoms/CategoryChip/CategoryChip";

type NoteProps = {
  note: TNote;
  handleDelete: (id: number) => Promise<void>;
  handleUpdate: (id: number, note: TNote) => Promise<void>;
  handleArchive: (note: TNote) => Promise<void>;
  handleUnarchive: (note: TNote) => Promise<void>;
  handleAddCategory: (idNote: number, idCategory: number) => Promise<void>;
  handleRemoveCategory: (idNote: number, idCategory: number) => Promise<void>;
};

const Note = (props: NoteProps) => {
  const [content, setContent] = useState(props.note.content);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      {modalIsOpen && (
        <CategoryModal
          key={props.note.id}
          handleClose={toggleModal}
          handleAddCategory={props.handleAddCategory}
          handleRemoveCategory={props.handleRemoveCategory}
          note={props.note}
        />
      )}
      <div
        className={`note ${focused ? "focus" : ""} ${
          props.note.status === "ACTIVE" ? "active" : "archived"
        }`}
        onBlur={() => {
          if(content !== props.note.content){
            props.handleUpdate(props.note.id, { ...props.note, content });
          }
          setFocused(false);
        }}
        onFocus={() => {
          setFocused(true);
        }}
      >
        <div className="note_text_container">
          <NoteContent content={content} setContent={setContent} />
          
          <div className="note_categories">
            { props.note.categories.map( 
                category => <CategoryChip name={category.name} key={category.id}/>
              ) 
            }
          </div>
        </div>
        <div className="note_buttons">
          <NoteButton
            text={"Delete note"}
            icon={"delete_icon.svg"}
            handleClick={() => props.handleDelete(props.note.id)}
          />
          {props.note.status === "ACTIVE" ? (
            <NoteButton
              text={"Archive note"}
              icon={"archive_icon.svg"}
              handleClick={() => props.handleArchive(props.note)}
            />
          ) : (
            <NoteButton
              text={"Activate note"}
              icon={"activate_icon.svg"}
              handleClick={() => props.handleUnarchive(props.note)}
            />
          )}
          <NoteButton
            text={"Add category"}
            icon={"tag_icon.svg"}
            handleClick={() => toggleModal()}
          />
        </div>
      </div>
    </>
  );
};

export default Note;
