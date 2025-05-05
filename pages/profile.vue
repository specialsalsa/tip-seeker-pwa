<template>
  <div class="container">
    <h1 class="title">Profile</h1>
    <v-card class="card">
      <v-card-text> Username: {{ store.email }} </v-card-text>
      <v-card-text>Ratings: {{ totalRatings }}</v-card-text>
    </v-card>
    <v-btn class="logout-button" @click="logout">Logout</v-btn>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from "~/store/store";

  const store = useUserStore();
  const totalRatings = ref("");

  onMounted(async () => {
    try {
      const res = await fetch(
        `https://wildlyle.dev:8020/getTotalRatings?userKey=${store.userKey}`
      );
      const json = await res.json();
      totalRatings.value = json.totalRatings;
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
