<template>
  <div class="scroll-container">
    <h1 class="title">Tipper Lookup</h1>

    <div class="text-field-container">
      <v-text-field
        label="Address"
        class="address"
        v-model="store.formData"
        autofocus
        variant="solo"
        elevation="5"
        rounded="lg"
        @input="handleInput($event.target.value)"
      >
      </v-text-field>
      <v-icon
        v-if="store.formData"
        icon="mdi-close-circle-outline"
        class="clear-icon"
        size="large"
        @click="clearInput()"
      ></v-icon>
    </div>

    <TipLogCard
      v-for="value in tipperArray"
      :title="value && value.address"
      :tip-ratings="value && value.tipRating"
      :notes="value && value.note"
    />
  </div>
</template>

<script setup lang="ts">
  import { provide } from "vue";
  import { capitalizeFirstLetter, getUserKey, setUserKey } from "~/util/util";
  import { debounce } from "lodash";
  import { useUserStore } from "~/store/store";
  import type { TipperResponse } from "~/types";

  const store = useUserStore();

  const userKey = getUserKey();

  provide("userKey", userKey);

  onMounted(() => {
    handleInput(store.formData);
  });

  let resCount = 0;

  const tipperArray = ref([] as Partial<TipperResponse[]>);

  function handleInput(data: string) {
    if (!data) {
      tipperArray.value = [];
      return;
    }

    store.formData = data;

    const throttledLookup = debounce(handleGetTippers, 150, {
      leading: true,
      trailing: false,
    });

    throttledLookup(store.formData);
  }

  function clearInput(): void {
    store.formData = "";
    tipperArray.value = [];
  }

  const handleGetTippers = async (data: string) => {
    try {
      const res = await fetch(
        `https://wildlyle.dev:8020/lookupTippers?address=${data}&userKey=${userKey}`
      );

      const json = await res.json();

      resCount++;

      if (json) {
        tipperArray.value = json.map((order: TipperResponse, index: number) => {
          return {
            ...order,
            address: capitalizeFirstLetter(order.address),
            key: index + resCount * 10 + 1,
          };
        });
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

  .text-field-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .clear-icon {
    margin-top: 2rem;
    margin-right: 2rem;
  }

  .scroll-container {
    overflow-y: auto;
    height: 85vh;
  }

  .content {
    padding: 16px;
  }
</style>
