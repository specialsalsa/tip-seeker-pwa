<template>
  <v-card elevation="3" color="primary" variant="text" class="card">
    <v-card-title>Tip History</v-card-title>
    <div class="history-item-container" v-for="tip in state.tipRatings">
      <v-icon icon="mdi-star"></v-icon>
      <v-icon
        v-for="i in 4"
        :icon="parseInt(tip) > i ? 'mdi-star' : 'mdi-star-outline'"
      ></v-icon>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { useUserStore } from "~/store/store";

  const state = useUserStore();
</script>

<style scoped>
  .history-item-container {
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
  }

  @media (prefers-color-scheme: dark) {
    .card {
      background-color: #2b2a2a;
    }
  }
</style>
