<template>
  <TipLogCard
    :title="tipperData.address"
    :tip-ratings="tipperData.tipRatings"
  />
  <Notes />
  <TipHistory />
</template>

<script setup lang="ts">
  import Notes from "~/components/Notes.vue";
  import { useUserStore } from "~/store/store";

  const tipperData = useUserStore();
</script>

<style scoped>
  .title {
    font-size: 1.1rem;
    text-wrap: auto;
  }
</style>
