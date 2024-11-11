<template>
  <v-card class="card">
    <v-card-title class="title">{{ title }}</v-card-title>
  </v-card>
</template>

<script setup lang="ts">
  defineProps<{
    title?: string;
  }>();
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
