<template>
  <div>
    <h2>Email: {{ store.email }}</h2>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from "~/store/store";

  const store = useUserStore();

  try {
  } catch (err) {
    console.log(err);
  }
</script>

<style></style>
