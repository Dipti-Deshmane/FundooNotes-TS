import axios from "axios";
import base_url from "../API/baseUrl";

export interface Note {
  id?: number;
  title: string;
  description: string;
  isArchived?: boolean;
  isDeleted?: boolean;
  color?:string;
  [key: string]: any;
}

interface ApiResponse<T> {
  data: T;
}

const NoteServices = {

  fetchNotes: async (token: string): Promise<{ data: { data: Note[] } }> => {
    const response = await axios.get(`${base_url}/notes/getNotesList`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  },

  addNote: async (newNote: Note, token: string): Promise<Note> => {
    try {
      const response: ApiResponse<Note> = await axios.post(
        `${base_url}/notes/addNotes`,
        newNote,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in adding note", error);
      throw error;
    }
  },

   updateNote : async (id: number, updatedNote: Note, token: string) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    await axios.put(`${base_url}/notes/updateNotes/${id}`, updatedNote, config);
  },


  
setNoteToArchive : (noteIdList: number[], token: string) => {
  return axios.post(`${base_url}/notes/archiveNotes`, {
    noteIdList,
    isArchived: true
  }, {
    headers: { Authorization: token },
  });
},
setNoteToUnArchive : (noteIdList: number[], token: string) => {
  return axios.post(`${base_url}/notes/archiveNotes`, {
    noteIdList,
    isArchived: false
  }, {
    headers: { Authorization: token },
  });
},

setNoteToTrash : (noteIdList: number[], token: string) => {
  return axios.post(`${base_url}/notes/trashNotes`, {
    noteIdList,
    isDeleted: true
  }, {
    headers: { Authorization: token },
  });
},
deleteNoteForever : (noteIdList: number[], token: string) => {
  return axios.post(`${base_url}/notes/deleteForeverNotes`, {
    noteIdList,
    isDeleted: true
  }, {
    headers: { Authorization: token },
  });
},

setNoteToUnTrash : (noteIdList: number[], token: string) => {
  return axios.post(`${base_url}/notes/trashNotes`, {
    noteIdList,
    isDeleted: false
  }, {
    headers: { Authorization: token },
  });
},

setColor: async (noteIdList: number[], token: string, color: string) => {
  try {
    await axios.post(
      `${base_url}/notes/changesColorNotes`,
      { noteIdList, color },
      { headers: { Authorization: token } }
    );
  } catch (error) {
    console.error("Error in setting note color", error);
    throw error;
  }
},



fetchTrashNotes: async (token: string): Promise<{ data: { data: Note[] } }> => {
  const response = await axios.get(`${base_url}/notes/getTrashNotesList`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
},

fetchArchiveNotes: async (token: string): Promise<{ data: { data: Note[] } }> => {
  const response = await axios.get(`${base_url}/notes/getArchiveNotesList`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
},

};



export default NoteServices;
