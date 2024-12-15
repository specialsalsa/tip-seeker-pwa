<template>
  <v-card elevation="2" class="card" rounded="lg">
    <v-card-title>Notes</v-card-title>
    <div class="notes-container" v-for="(note, index) in state.notes">
      <div class="note-edit-container" v-if="noteIndex === index">
        <v-form @submit.prevent="submitNoteChange(index)" class="form">
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
      <div class="note-text-container" v-if="noteIndex !== index || !note">
        <!-- <v-text-field label="Label"></v-text-field> -->
        <p :id="'note-' + index" class="note">{{ note }}</p>
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

    <v-form @submit.prevent="submitNoteAdd()">
      <v-text-field
        class="text-field"
        density="compact"
        focused
        min-width="40vw"
        v-model="noteText"
        label="Add note..."
        variant="outlined"
        v-if="newNoteActive"
      ></v-text-field>
    </v-form>
    <div class="add-button-container">
      <v-icon
        class="new-note-plus"
        icon="mdi-plus"
        @click="addNote"
        v-if="!newNoteActive"
      ></v-icon>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { useUserStore } from "~/store/store";

  const state = useUserStore();
  const noteIndex = ref();

  const noteText = ref("");
  const newNoteActive = ref(false);

  const editNote = (index: number): void => {
    const saveNoteIndex = (index: number): void => {
      noteIndex.value = index;
    };
    saveNoteIndex(index);
  };

  const addNote = () => {
    newNoteActive.value = true;
  };

  const submitNoteChange = (index: number): void => {
    state.editNote(index, state.notes[index], noteText.value);

    noteIndex.value = null;
    noteText.value = "";
    newNoteActive.value = false;

    //todo: submit to database
  };

  const submitNoteAdd = (): void => {
    state.addNote(noteText.value);
    // state.notes[index] = noteText.value;
    noteIndex.value = null;
    noteText.value = "";
    newNoteActive.value = false;

    //todo: submit to database
  };

  const deleteNote = (index: number): void => {
    //todo: create action in store for real saving
    state.deleteNote(state.notes[index]);
    delete state.notes[index];
    noteIndex.value = null;
    noteText.value = "";
  };
</script>

<style scoped>
  .text-field {
    margin: 0;
    max-width: 50vw;
    margin-left: 20vw;
  }

  @media (min-width: 1280px) {
    .text-field {
      margin-left: 10vw;
    }
  }

  .note {
    margin-bottom: 0.5rem;
    margin-right: 3rem;
  }

  .notes-container {
    display: flex;
    justify-content: space-between;
  }

  .note-text-container {
    min-width: 50vw;
    text-align: center;
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

  .add-button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
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
