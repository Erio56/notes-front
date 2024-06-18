import { TCategory } from "../Types/Category";

const apiUrl = 'http://localhost:4000/v1'

export const fetchCategories = async () => {
   try {
      const response = await fetch(`${apiUrl}/categories`);
      const data: TCategory[] = await response.json();
      return data;
   } catch (error) {
      throw Error('Error fetching')
   }
}

export const createCategory = async (name: string) => {
   try {
      const fetchOptions = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            name: name
         })
      }
      const response = await fetch(`${apiUrl}/categories/register`, fetchOptions);
      const data: TCategory = await response.json();
      return data;
   } catch (error) {
      throw Error('Error fetching')
   }
}

export const deleteCategory = async (id: number) => {
   try {
      const fetchOptions = {
         method: "DELETE"
      }
      await fetch(`${apiUrl}/categories/${id}`, fetchOptions);
   } catch (error) {
      throw Error('Error fetching')
   }
}
