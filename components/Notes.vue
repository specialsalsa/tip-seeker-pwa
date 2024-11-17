<template>
  <v-card elevation="3" class="card" rounded="lg">
    <v-card-title>Notes</v-card-title>
    <div class="notes-container" v-for="(note, index) in state.notes">
      <div class="note-edit-container">
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
      </div>
      <!-- <v-text-field label="Label"></v-text-field> -->
      <p :id="'note-' + index" v-bind:hidden="noteIndex === index" class="note">
        {{ note }}
      </p>
      <v-icon icon="mdi-pencil" size="md" @click="editNote(index)"></v-icon>
    </div>
  </v-card>
</template>

<script setup lang="ts">
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
    padding: 0rem 1rem 2rem 0rem;
  }

  .text-field {
    margin: 0;
  }

  .note {
    margin-bottom: 0.5rem;
  }

  .notes-container {
    display: flex;
    justify-content: space-between;
  }

  .note-edit-container {
    display: flex;
    max-width: 80vw;
    margin: 0;
  }

  @media (min-width: 1280px) {
    .note-edit-container {
      max-width: 30vw;
    }
  }
</style>
