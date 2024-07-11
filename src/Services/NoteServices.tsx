import axios from "axios";
import base_url from "../API/baseUrl";

export interface Note {
  id?: number;
  title: string;
  description: string; 
  archive?: boolean;
  trash?: boolean;
  [key: string]: any;
}


interface ApiResponse<T> {
  data: T;
}

const NoteServices = {  
  fetchNotes: async (token: string): Promise<ApiResponse<Note[]>> => {
  try {
    const response = await axios.get(`${base_url}/notes/getNotesList`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notes", error);
    throw error;
  }
},
  addNote: async (newNote: Note, token: string): Promise<Note> => {
    try {
       const response: ApiResponse<Note> = await axios.post(`${base_url}/notes/addNotes`, newNote, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in adding note", error);
      throw error;
    }
  },
};

export default NoteServices;
