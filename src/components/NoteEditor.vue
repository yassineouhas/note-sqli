<script setup>
import { ref , watchEffect , computed } from 'vue'
import axios from 'axios'
import { useNotesStore } from '@/stores/notes'

const note = ref({
  title: '',
  content: ''
})

const isEditing = computed(() => store.editNote !== null);

const store = useNotesStore()

// Watch for changes in the editNote computed property
watchEffect(() => {
  note.value = {...store.getNoteById(store.editNote) };
});

function submit() {
  if (isEditing.value) {
    store.editNoteInList(note.value);
  } else {
    store.submitNote(note.value);
  }
}



function resetForm() {
  note.value = {};
  store.clearEditNote();
}
</script>

<template>
  <div class="p-4 border rounded shadow-lg">
    <form @submit.prevent="submit">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          id="title"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="note.title"
        />
      </div>
      <div class="mb-4">
        <label for="content" class="block text-gray-700 text-sm font-bold mb-2">Content</label>
        <textarea
          id="content"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="note.content"
          rows="4"
        />
      </div>
      <button class="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
        save
      </button>
    </form>
  </div>
</template>
