<template>
  <div id="scroll-container">
    <h1 class="title">Tip Log</h1>
    <TipLogCard
      v-for="tipper in tipperArray"
      :title="tipper.address"
      :tip-ratings="tipper.tipRating"
      :notes="tipper.note"
    />
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from "~/store/store";
  import type { TipperResponse } from "~/types";
  const store = useUserStore();
  const userKey = store.userKey;
  let page = 1;
  const tipperArray = ref<TipperResponse[]>([]);

  const getUserOrders = async (userKey: string): Promise<TipperResponse[]> => {
    try {
      const res = await fetch(
        `https://wildlyle.dev:8020/getUserOrders?userKey=${userKey}&page=${page}`
      );
      const json = await res.json();

      page++;

      if (json) return json;
    } catch (err) {
      console.log(err);
    }
    return [];
  };

  tipperArray.value = await getUserOrders(userKey as string);
</script>

<style scoped>
  .title {
    font-size: 2rem;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    /* margin-bottom: 1rem; */
  }

  .star-container {
    margin-left: 0.8em;
  }

  a {
    text-decoration: none;
  }
</style>
