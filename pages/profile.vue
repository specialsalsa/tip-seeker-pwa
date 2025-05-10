<template>
  <div class="container">
    <h1 class="title">Profile</h1>
    <v-card class="card" elevation="3">
      <v-card-title> {{ store.email }} </v-card-title>
      <v-card-text
        >Total Ratings: {{ store.totalRatings }}<br />
        Average Rating:
        {{ parseFloat(store.averageRating).toFixed(2) }}</v-card-text
      >
    </v-card>
    <v-btn class="logout-button" @click="logout">Logout</v-btn>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from "~/store/store";

  const store = useUserStore();

  const logout = () => {
    store.userKey = "";
    store.token = "";
    localStorage.removeItem("user_key");
    localStorage.removeItem("token");

    navigateTo("/");
  };
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .title {
    margin-top: 1rem;
  }

  .logout-button {
    margin: 0 auto;
  }
</style>
