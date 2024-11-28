<template>
  <NuxtLink
    :to="{
      name: 'details-id',
      params: { id: title },
    }"
  >
    <v-card class="card" elevation="5" rounded="lg" @click="setTipperData">
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
  </NuxtLink>
</template>

<script setup lang="ts">
  import { handleStarRating } from "~/util/util";
  import { useUserStore } from "~/store/store";

  const state = useUserStore();

  const props = defineProps<{
    title?: string;
    tipRatings?: string[];
    notes?: string[];
  }>();

  const getTipRatingAverage = (ratingArr: string[]): number => {
    if (!ratingArr.length) return 0;

    const avg =
      Math.round(
        (ratingArr.reduce((acc, cur) => (acc += parseInt(cur)), 0) /
          ratingArr.length) *
          100
      ) / 100;
    return avg;
  };

  const average = computed(() => getTipRatingAverage(props.tipRatings || []));

  const setTipperData = () => {
    state.addCurrentUser(
      props.title as string,
      props.tipRatings as string[],
      props.notes as string[]
    );
  };
</script>

<style scoped>
  .title {
    font-size: 1.1rem;
    text-wrap: auto;
  }

  .star-container {
    margin-left: 0.8em;
  }

  a {
    text-decoration: none;
  }
</style>
