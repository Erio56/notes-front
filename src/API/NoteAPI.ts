import { TNote } from "../Types/Note";

const apiUrl = 'http://localhost:4000/v1'

export const fetchActiveNotes = async () => {
   try {
      const response = await fetch(`${apiUrl}/notes/`);
      const data: TNote[] = await response.json();
      return data;
   } catch (error) {
      throw Error('Error fetching')
   }
}

export const fetchArchivedNotes = async () => {
   try {
      const response = await fetch(`${apiUrl}/notes/archived`);
      const data: TNote[] = await response.json();
      return data;
   } catch (error) {
      throw Error('Error fetching')
   }
}

export const createNote = async (content: string) => {
   try {
      const fetchOptions = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            content: content
         })
      }
      const response = await fetch(`${apiUrl}/notes/register`, fetchOptions);
      const data: TNote = await response.json();
      return data;
   } catch (error) {
      throw Error('Error fetching')
   }
}

export const updateNote = async (id: number, note: TNote) => {
   try {
      const fetchOptions = {
         method: "PUT",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            id: id,
            note: note
         })
      }
      const response =  await fetch(`${apiUrl}/notes/`, fetchOptions);
      const data: TNote = await response.json();
      console.log(data);
      return data;
   } catch (error) {
      throw Error('Error fetching')
   }
}

export const deleteNote = async (id: number) => {
   try {
      const fetchOptions = {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json"
         }
      }
      await fetch(`${apiUrl}/notes/${id}`, fetchOptions);
   } catch (error) {
      throw Error('Error fetching')
   }
}

export const addCategoryToNote = async (idNote: number, idCategory: number) => {
   try {
      const fetchOptions = {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            idNote: idNote,
            idCategory: idCategory
         })
      }
      const response =  await fetch(`${apiUrl}/notes/categories/add`, fetchOptions);
      const data: TNote = await response.json();
      console.log(data);
      return data;
   } catch (error) {
      throw Error('Error fetching')
   }
}

export const removeCategoryFromNote = async (idNote:number, idCategory:number) => {
   try {
      const fetchOptions = {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            idNote: idNote,
            idCategory: idCategory
         })
      }
      const response =  await fetch(`${apiUrl}/notes/categories/remove`, fetchOptions);
      const data: TNote = await response.json();
      return data;
   } catch (error) {
      throw Error('Error fetching')
   }
}