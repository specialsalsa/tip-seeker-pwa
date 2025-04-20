<template>
  <div class="container">
    <h1 class="title">Profile</h1>
    <v-card class="card">
      <v-card-text> Username: {{ store.email }} </v-card-text>
      <!-- <v-card-text>Ratings: 100</v-card-text> -->
    </v-card>
    <v-btn class="logout-button" @click="logout">Logout</v-btn>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from "~/store/store";

  const store = useUserStore();

  try {
  } catch (err) {
    console.log(err);
  }

  const logout = () => {
    store.userKey = "";
    store.isLoggedIn = false;
    localStorage.removeItem("userKey");

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
    margin: 0 1rem;
  }
</style>
