<template>
  <v-card class="card">
    <v-card-title>Add Rating</v-card-title>
    <div class="star-container">
      <v-icon
        v-for="i in 5"
        :icon="handleStarRating(rating, i)"
        @click="rating = i"
      ></v-icon>
    </div>
    <div class="rating-button-container">
      <v-btn @click="submitRating(rating)">Submit Rating</v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { useUserStore } from "~/store/store";

  const user = useUserStore();
  const rating = ref(0);

  const handleStarRating = (rating: number, target: number): string => {
    if (rating < target) {
      return "mdi-star-outline";
    } else {
      return "mdi-star";
    }
  };

  const submitRating = async (rating: number): Promise<void> => {
    const res = await fetch(
      `https://wildlyle.dev:8020/setTipData?address=${
        user.address
      }&tipRating=${rating}&timestamp=${Date.now()}`,
      {
        method: "POST",
      }
    );

    const json = await res.json();

    user.tipRatings.push(rating.toString());
  };
</script>

<style scoped>
  .card {
    min-height: 10rem;
    margin: 1rem 1rem;
    padding: 0 1rem 2rem 0;
  }

  .star-container,
  .rating-button-container {
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
  }
</style>
