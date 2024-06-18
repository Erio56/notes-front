import { TCategory } from "./Category"

export type TNote = {
   id: number,
   content: string,
   status: string
   categories: TCategory[]
}