<script setup>
import { computed } from 'vue'
import NoteItem from './NoteItem.vue'
import NoteEditor from './NoteEditor.vue'
import { useNotesStore } from '@/stores/notes'

const store = useNotesStore()
store.fetchNotes()
const notes = computed(() => store.notes)

const deleteNoteHandler = (id) => {
  store.deleteNote(id);
};
</script>

<template>
  <NoteEditor></NoteEditor>
  <NoteItem class="space-y-4" v-for="note in notes" :key="note.id" :note="note" />
</template>

<style scoped></style>
