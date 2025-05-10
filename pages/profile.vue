<template>
  <div class="container">
    <h1 class="title">Profile</h1>
    <v-card class="card">
      <v-card-title> {{ store.email }} </v-card-title>
      <v-card-text
        >Total Ratings: {{ store.totalRatings }}<br />
        Average Rating:
        {{ store.averageRating }}</v-card-text
      >
    </v-card>
    <v-btn class="logout-button" @click="logout">Logout</v-btn>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from "~/store/store";

  const store = useUserStore();

  onMounted(async () => {
    try {
      if (!store.totalRatings) {
        const res = await fetch(
          `https://wildlyle.dev:8020/getTotalRatings?userKey=${store.userKey}`
        );
        const json = await res.json();
        store.totalRatings = json.totalRatings;
      }
    } catch (err) {
      console.log(err);
    }

    try {
      if (!store.averageRating) {
        const res = await fetch(
          `https://wildlyle.dev:8020/getRatingAverage?userKey=${store.userKey}`
        );
        const json = await res.json();
        store.averageRating = json.averageRating;
      }
    } catch (err) {
      console.log(err);
    }
  });

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
