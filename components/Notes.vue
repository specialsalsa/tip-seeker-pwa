<template>
  <v-card elevation="3" class="card" rounded="lg">
    <v-card-title>Notes</v-card-title>
    <div class="notesContainer" v-for="(note, index) in state.notes">
      <v-form @submit.prevent="submitNoteChange(index)">
        <v-text-field
          class="text-field"
          density="compact"
          focused
          min-width="75vw"
          v-model="noteText"
          label="Edit note..."
          variant="outlined"
          v-if="noteIndex === index"
        ></v-text-field>
      </v-form>
      <!-- <v-text-field label="Label"></v-text-field> -->
      <p :id="'note-' + index" v-bind:hidden="noteIndex === index">
        {{ note }}
      </p>
      <v-icon icon="mdi-pencil" size="md" @click="editNote(index)"></v-icon>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import type { VNodeRef } from "vue";
  import { useUserStore } from "~/store/store";

  const state = useUserStore();
  const noteIndex = ref();

  const noteText = ref("");

  const editNote = (index: number) => {
    const saveNoteIndex = (index: number): void => {
      noteIndex.value = index;
    };
    saveNoteIndex(index);
  };

  const submitNoteChange = (index: number): any => {
    //todo: create action in store for real saving
    state.notes[index] = noteText.value;
    noteIndex.value = null;
    noteText.value = "";
  };
</script>

<style scoped>
  .card {
    min-height: 5rem;
    margin: 1rem 1rem;
    margin-bottom: 10rem;
    padding: 1rem 1rem 2rem 1rem;
  }

  .notesContainer {
    display: flex;
    justify-content: space-between;
  }
</style>
