<template>
  <h1 class="title">Tipper Lookup</h1>

  <v-text-field
    label="Address"
    class="address"
    v-model="formData"
    variant="solo"
    elevation="5"
    :autofocus="true"
    rounded="lg"
    @input="handleInput($event.target.value)"
  >
  </v-text-field>

  <TipLogCard
    v-for="value in tipperArray"
    :title="value && value.address"
    :tip-ratings="value && value.tipRating"
  />
</template>

<script setup lang="ts">
  import { capitalizeFirstLetter } from "~/util/util";
  import { debounce } from "lodash";

  interface TipperResponse {
    _id: string;
    id: string;
    address: string;
    coordinates: number | null[];
    tipRating: string[];
    __v: number;
    note: string[];
    timestamp: number;
    key: number;
  }

  let resCount = 0;
  const formData = ref("");

  const tipperArray = ref([] as Partial<TipperResponse[]>);

  function handleInput(data: string) {
    if (!data) {
      tipperArray.value = [];
      return;
    }

    const throttledLookup = debounce(handleGetTippers, 150, {
      leading: true,
      trailing: false,
    });

    throttledLookup(data);
  }

  const handleGetTippers = async (data: string) => {
    try {
      //todo: implement userkey state
      const res = await fetch(
        `https://wildlyle.dev:8020/lookupTippers?address=${data}&userKey=`
      );

      const json = await res.json();

      resCount++;

      if (json) {
        tipperArray.value = json
          .map((order: Record<string, any>, index: number) => {
            return {
              ...order,
              address: capitalizeFirstLetter(order.address),
              key: index + resCount * 10 + 1,
            };
          })
          .reverse();
      }
    } catch (err) {
      console.log(err);
    }
  };
</script>

<style scoped>
  .title {
    font-size: 2rem;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    /* margin-bottom: 1rem; */
  }

  .address {
    margin: 3rem 2rem;
    max-height: 1.5em;
  }
</style>
