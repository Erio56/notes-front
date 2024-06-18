import { useEffect, useState } from "react";
import { TNote } from "../../../Types/Note";
import {
  addCategoryToNote,
  createNote,
  deleteNote,
  fetchActiveNotes,
  fetchArchivedNotes,
  removeCategoryFromNote,
  updateNote,
} from "../../../API/NoteAPI";
import "./NoteList.css";
import Note from "../../Molecules/Note/Note";
import CreateNoteButton from "../../Atoms/CreateNoteButton/CreateNoteButton";
import PrimaryButton from "../../Atoms/PrimaryButton/PrimaryButton";
import SelectInput from "../../Atoms/SelectInput/SelectCategory";
import { useCategoryContext } from "../../../Context/CategoriesContext";

const NoteList = () => {
  const [activeNotes, setActiveNotes] = useState<TNote[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<TNote[]>([]);
  const [showArchivedNotes, setShowArchivedNotes] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { categories, refreshCategories } = useCategoryContext();

  const handleNewNote = async (content: string) => {
    const newNote = await createNote(content);
    setActiveNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleUpdateNote = async (id: number, note: TNote) => {
    try {
      const updatedNote = await updateNote(id, note);
      setActiveNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === id ? { ...n, ...updatedNote } : n))
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteNote = async (id: number) => {
    try {
      await deleteNote(id);
      setActiveNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      setArchivedNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleArchiveNote = async (note: TNote) => {
    try {
      await updateNote(note.id, { ...note, status: "ARCHIVED" });
      note.status = "ARCHIVED";
      setActiveNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
      setArchivedNotes((prevNotes) => [...prevNotes, note]);
    } catch (error) {
      console.log(error);
    }
  };

  const getArchivedNotes = async () => {
    setArchivedNotes(await fetchArchivedNotes());
    setShowArchivedNotes(!showArchivedNotes);
  };

  const handleUnarchiveNote = async (note: TNote) => {
    try {
      await updateNote(note.id, { ...note, status: "ACTIVE" });
      note.status = "ACTIVE";
      setArchivedNotes((prevNotes) =>
        prevNotes.filter((n) => n.id !== note.id)
      );
      setActiveNotes((prevNotes) => [...prevNotes, note]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCategoryToNote = async (
    noteId: number,
    categoryId: number
  ) => {
    const noteToUpdate = activeNotes.find((note) => note.id === noteId);
    const newNote = await addCategoryToNote(noteId, categoryId);
    if (noteToUpdate && noteToUpdate) {
      noteToUpdate.categories = newNote.categories;
    }
    console.log(noteToUpdate);
  };

  const handleRemoveCategoryToNote = async (
    noteId: number,
    categoryId: number
  ) => {
    const noteToUpdate = activeNotes.find((note) => note.id === noteId);
    const newNote = await removeCategoryFromNote(noteId, categoryId);
    if (noteToUpdate && noteToUpdate) {
      noteToUpdate.categories = newNote.categories;
    }
    console.log(noteToUpdate);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(Number(event.target.value));
  };

  const filterNotesByCategory = (notes: TNote[]) => {
    return selectedCategory
      ? notes.filter((note) =>
          note.categories.some((category) => category.id === selectedCategory)
        )
      : notes;
  };

  const filteredActiveNotes = filterNotesByCategory(activeNotes);
  const filteredArchivedNotes = filterNotesByCategory(archivedNotes);

  useEffect(() => {
    fetchActiveNotes()
      .then((response) => {
        setActiveNotes(response.reverse());
      })
      .catch((error) => {
        console.log(error);
      });

    refreshCategories();

    return () => {};
  }, []);

  return (
    <div>
      <div className="note_toolbar">
        <PrimaryButton
          text={showArchivedNotes ? "Show active notes" : "Show archived notes"}
          icon={"archive_icon.svg"}
          colorHex={"#ffe8e8"}
          handleClick={getArchivedNotes}
          iconSize={30}
        />
        <div className="note_filter">Filter:</div>
        <SelectInput
          categories={categories}
          selectedCat={selectedCategory}
          handleSelect={handleCategoryChange}
        />
      </div>
      <div className="note_list_container">
        <div className="create_note_button_wraper">
          {!showArchivedNotes &&
            (selectedCategory === null || selectedCategory === 0) && (
              <CreateNoteButton handleClick={handleNewNote} />
            )}
        </div>
        {!showArchivedNotes
          ? filteredActiveNotes.map((note) => (
              <Note
                key={note.id}
                note={note}
                handleDelete={handleDeleteNote}
                handleUpdate={handleUpdateNote}
                handleArchive={handleArchiveNote}
                handleUnarchive={handleUnarchiveNote}
                handleAddCategory={handleAddCategoryToNote}
                handleRemoveCategory={handleRemoveCategoryToNote}
              />
            ))
          : filteredArchivedNotes.map((note) => (
              <Note
                key={note.id}
                note={note}
                handleDelete={handleDeleteNote}
                handleUpdate={handleUpdateNote}
                handleArchive={handleArchiveNote}
                handleUnarchive={handleUnarchiveNote}
                handleAddCategory={handleAddCategoryToNote}
                handleRemoveCategory={handleRemoveCategoryToNote}
              />
            ))}
      </div>
    </div>
  );
};

export default NoteList;
