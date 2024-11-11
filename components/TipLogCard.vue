<template>
  <v-card class="card" elevation="3" rounded="lg">
    <v-card-title class="title" v-text="title"></v-card-title>
    <v-card-subtitle>
      Average: {{ getTipRatingAverage(tipRatings) }}
    </v-card-subtitle>
  </v-card>
</template>

<script setup lang="ts">
  defineProps<{
    title?: string;
    tipRatings: string[] | undefined;
  }>();

  const getTipRatingAverage = (ratingArr: string[] | undefined) => {
    if (!ratingArr) return "";
    return (
      ratingArr.reduce((acc, cur) => (acc += parseInt(cur)), 0) /
      ratingArr.length
    ).toFixed(2);
  };
</script>

<style scoped>
  .card {
    min-height: 5rem;
    margin: 1rem 1rem;
    padding-bottom: 2rem;
  }

  .title {
    font-size: 1.2rem;
    text-wrap: auto;
  }
</style>
