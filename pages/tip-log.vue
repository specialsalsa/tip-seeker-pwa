<template>
  <div id="scroll-container">
    <h1 class="title">Tip Log</h1>
    <TipLogCard
      v-for="tipper in tipperArray"
      :title="tipper.address"
      :tip-ratings="tipper.tipRating"
      :notes="tipper.note"
      :hide-notes="false"
    />
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from "~/store/store";
  import type { TipperResponse } from "~/types";
  import { capitalizeFirstLetter } from "~/util/util";
  const store = useUserStore();
  const userKey = store.userKey;
  let page = 1;
  const tipperArray = ref<TipperResponse[]>([]);

  const getUserOrders = async (userKey: string): Promise<TipperResponse[]> => {
    try {
      const res = await fetch(
        `https://wildlyle.dev:8020/getUserOrders?userKey=${userKey}&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();

      page++;

      if (json) return json;
    } catch (err) {
      console.log(err);
    }
    return [];
  };

  onMounted(async () => {
    if (userKey) {
      tipperArray.value = (await getUserOrders(userKey))
        .map((tipper) => {
          tipper.address = capitalizeFirstLetter(tipper.address);
          return tipper;
        })
        .toReversed();
    }
  });
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
