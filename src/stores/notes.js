import { defineStore } from 'pinia'
import axios from 'axios'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
    editNote: null,
  }),
  getters: {
    // getNoteByID
    getNoteById: (state) => (id) => {
      return state.notes.find((note) => note.id === id)
    }
  },
  actions: {
    // fetch all notes
    async fetchNotes() {
      try {
        const response = await axios.get('http://localhost:3000/notes')
        this.notes = response.data
      } catch (error) {
        console.error('ERROR Fetching Notes :', error)
      }
    },

    async deleteNote(id) {
      try {
        await axios.delete(`http://localhost:3000/notes/${id}`)
        // Update the notes array after successful deletion
        this.notes = this.notes.filter((note) => note.id !== id)
      } catch (error) {
        console.error('ERROR Deleting Note:', error)
      }
    },


    setEditNote(id) {
      this.editNote = id;
    },

    async editNoteInList(updatedNote) {
      // Update the notes array after successful edit
   
      const id= updatedNote.id;
          await axios.put(`http://localhost:3000/notes/${id}`, updatedNote);
        const editedNoteIndex = this.notes.findIndex((note) => note.id === id);
        if (editedNoteIndex !== -1) {
          // Replace the old note with the edited note
          this.notes.splice(editedNoteIndex, 1, { id, ...updatedNote });

          this.clearEditNote();
        }

    },

    clearEditNote() {
      this.editNote = null;
    },

    async submitNote(newNote) {
      try {
        await axios.post('http://localhost:3000/notes', newNote)
        this.notes.push({...newNote});
        this.fetchNotes();
      } catch (error) {
        console.error('ERROR Submitting Note:', error)
      }
    }
    
    
  }
})
