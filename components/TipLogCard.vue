<template>
  <NuxtLink
    :to="{
      name: 'details-id',
      params: { id: title },
    }"
  >
    <v-card class="card" elevation="3" rounded="lg" @click="setTipperData">
      <v-card-title class="title" v-text="title"></v-card-title>
      <v-card-subtitle> Average: {{ average }} </v-card-subtitle>
      <div class="star-container">
        <v-icon icon="mdi-star"></v-icon>
        <v-icon
          v-for="i in 4"
          :icon="handleStarRating(average, i + 0.3, i + 0.7)"
        />
      </div>
      <div class="note-container" v-if="!hideNotes">
        <div class="top-spacer"></div>
        <p class="note-text" v-for="note in notes">{{ note }}</p>
        <div class="bottom-spacer"></div>
      </div>
    </v-card>
  </NuxtLink>
</template>

<script setup lang="ts">
  import { handleStarRating } from "~/util/util";
  import { useUserStore } from "~/store/store";

  const state = useUserStore();

  const props = defineProps<{
    title: string;
    tipRatings: string[];
    notes: string[] | undefined;
    hideNotes: boolean | undefined;
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
    state.addCurrentUser(String(props.title), props.tipRatings!, props.notes!);
  };
</script>

<style scoped>
  .title {
    font-size: 1.1rem;
    text-wrap: auto;
    justify-content: flex-start;
  }

  .star-container {
    margin-left: 0.8em;
  }

  .note-text {
    margin-left: 2rem;
    margin-bottom: 0.5rem;
  }

  .top-spacer {
    margin-top: 1rem;
  }

  .bottom-spacer {
    margin-bottom: 1rem;
  }

  a {
    text-decoration: none;
  }
</style>
