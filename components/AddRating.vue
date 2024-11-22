<template>
  <v-overlay v-model="modalOpen"></v-overlay>
  <v-dialog v-model="modalOpen" class="dialog">
    <v-card class="card" rounded="lg" density="compact">
      <v-card-text
        >Please wait {{ Math.ceil(timeRemaining) }} minute{{
          timeRemaining < 1 ? "" : "s"
        }}
        to add another rating.
      </v-card-text>
      <v-card-actions>
        <v-btn @click="closeModal" size="default">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-card class="card" rounded="lg" elevation="2">
    <v-card-title>Add Rating</v-card-title>
    <div class="star-container">
      <v-icon
        v-for="i in 5"
        :icon="handleStarRating(rating, i)"
        @click="rating = i"
      ></v-icon>
    </div>
    <div class="rating-button-container">
      <v-btn color="grey-darken-3" @click="submitRating(rating)"
        >Submit Rating</v-btn
      >
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { useUserStore } from "~/store/store";

  const user = useUserStore();
  const rating = ref(0);
  const rateLimited = ref(false);
  const modalOpen = ref(false);
  const timeRemaining = ref(0);

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

    if (json.rateLimit) {
      rateLimited.value = true;
      modalOpen.value = true;
      timeRemaining.value = json.timeRemaining;
    }

    user.tipRatings.push(rating.toString());
  };

  const closeModal = () => (modalOpen.value = false);
</script>

<style scoped>
  .card {
    min-height: 10rem;
    margin: 1rem 1rem;
    padding: 0 1rem 1rem 0;
  }

  .dialong {
    margin: 0;
  }

  .star-container {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }

  .rating-button-container {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
  }
</style>
