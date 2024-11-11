<template>
  <v-card class="card" elevation="3" rounded="lg">
    <v-card-title class="title" v-text="title"></v-card-title>
    <v-card-subtitle> Average: {{ average }} </v-card-subtitle>
    <div class="star-container">
      <v-icon icon="mdi-star"></v-icon>
      <v-icon
        v-for="i in 4"
        :icon="handleStarRating(average, i + 0.3, i + 0.7)"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title?: string;
    tipRatings: string[] | undefined;
  }>();

  const getTipRatingAverage = (ratingArr: string[] | undefined): number => {
    if (!ratingArr) return 0;

    const avg =
      Math.round(
        (ratingArr.reduce((acc, cur) => (acc += parseInt(cur)), 0) /
          ratingArr.length) *
          100
      ) / 100;
    return avg;
  };

  const average = computed(() => getTipRatingAverage(props.tipRatings));

  const handleStarRating = (rating: number, low: number, high: number) => {
    if (rating < low) {
      return "mdi-star-outline";
    } else if (rating >= low && rating < high) {
      return "mdi-star-half-full";
    } else if (rating >= high) {
      return "mdi-star";
    }
  };
</script>

<style scoped>
  .card {
    min-height: 5rem;
    margin: 1rem 1rem;
    padding-bottom: 2rem;
  }

  .title {
    font-size: 1.1rem;
    text-wrap: auto;
  }

  .star-container {
    margin-left: 0.8em;
  }
</style>
