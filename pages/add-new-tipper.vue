<template>
  <h1 class="page-title">Add New Tipper</h1>
  <v-container class="card">
    <v-form
      class="form"
      @submit.prevent="
        useSubmitRating(
          address,
          city,
          state,
          rating,
          rateLimited,
          modalOpened,
          timeRemaining
        )
      "
    >
      <v-text-field
        class="input"
        v-model="address"
        label="Address"
      ></v-text-field>
      <v-text-field class="input" label="City" v-model="city"></v-text-field>
      <v-text-field class="input" label="State" v-model="state"></v-text-field>
      <v-radio-group v-model="rating">
        <v-radio label="No Tipper" value="1"></v-radio>
        <v-radio label="Bad Tipper" value="2"></v-radio>
        <v-radio label="Okay Tipper" value="3"></v-radio>
        <v-radio label="Good Tipper" value="4"></v-radio>
        <v-radio label="Great Tipper" value="5"></v-radio>
      </v-radio-group>
      <v-btn type="submit">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
  import { useSubmitRating } from "~/composables/useSubmitRating";

  const address = ref("");
  const city = ref("");
  const state = ref("");
  const rating = ref(0);
  const rateLimited = ref(false);
  const modalOpened = ref(false);
  const timeRemaining = ref(0);
</script>

<style scoped>
  .page-title {
    display: flex;
    justify-content: center;
  }
</style>
