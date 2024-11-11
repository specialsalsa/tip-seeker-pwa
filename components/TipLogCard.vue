<template>
  <v-card class="card">
    <v-card-title class="title">{{ title }}</v-card-title>
    <v-card-subtitle
      >Average: {{ getTipRatingAverage(tipRatings) }}</v-card-subtitle
    >
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

<style lang="scss">
  .card {
    min-height: 10rem;
    margin: 1rem 2rem;
  }

  .title {
    font-size: 1rem;
    text-wrap: wrap;
  }
</style>
