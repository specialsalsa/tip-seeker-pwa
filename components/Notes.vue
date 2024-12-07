<template>
  <v-card elevation="2" class="card" rounded="lg">
    <v-card-title>Notes</v-card-title>
    <div class="notes-container" v-for="(note, index) in state.notes">
      <div class="note-edit-container">
        <v-form @submit.prevent="submitNoteChange(index)">
          <v-text-field
            class="text-field"
            density="compact"
            focused
            min-width="40vw"
            v-model="noteText"
            label="Edit note..."
            variant="outlined"
            v-if="noteIndex === index"
          ></v-text-field>
        </v-form>
      </div>
      <div class="note-text-container" v-if="noteIndex !== index">
        <!-- <v-text-field label="Label"></v-text-field> -->
        <p :id="'note-' + index" class="note">
          {{ note }}
        </p>
      </div>
      <div class="note-icon-container">
        <v-icon
          v-if="state.notes[index]"
          class="button"
          icon="mdi-pencil"
          size="md"
          @click="editNote(index)"
        ></v-icon>
        <v-icon
          v-if="state.notes[index]"
          class="button"
          icon="mdi-close-circle-outline"
          size="md"
          @click="deleteNote(index)"
        ></v-icon>
      </div>
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

  const deleteNote = (index: number): void => {
    //todo: create action in store for real saving
    delete state.notes[index];
    noteIndex.value = null;
    noteText.value = "";
  };
</script>

<style scoped>
  .text-field {
    margin: 0;
    max-width: 50vw;
  }

  .note {
    margin-bottom: 0.5rem;
    margin-left: 3rem;
  }

  .notes-container {
    display: flex;
    justify-content: space-between;
  }

  .note-text-container {
    min-width: 50vw;
    text-align: center;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1.5vh;
  }

  .note-icon-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5vh;
  }

  .note-edit-container {
    display: flex;
    max-width: 80vw;
    margin-left: 20vw;
  }

  .button {
    margin: 0 0.5rem;
  }

  @media (min-width: 1280px) {
    .note-edit-container {
      max-width: 30vw;
    }
  }
</style>
