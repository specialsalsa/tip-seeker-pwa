<template>
  <TipLogCard
    :title="tipperData.address"
    :tip-ratings="tipperData.tipRatings"
  />
  <Notes />
  <TipHistory />
  <v-container class="button-container">
    <v-btn prepend-icon="mdi-map-marker" :href="mapsLink" class="maps-button"
      >Google Maps link
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
  import Notes from "~/components/Notes.vue";
  import { useUserStore } from "~/store/store";

  const tipperData = useUserStore();

  const mapsLink = `geo:0,0?q=${tipperData.address}`;
</script>

<style scoped>
  .title {
    font-size: 1.1rem;
    text-wrap: auto;
  }

  .button-container {
    display: flex;
    justify-content: center;
  }
</style>
