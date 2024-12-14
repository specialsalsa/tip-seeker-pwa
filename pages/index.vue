<template>
  <div class="scroll-container">
    <h1 class="title">Tipper Lookup</h1>

    <div class="text-field-container">
      <v-text-field
        label="Address"
        class="address"
        v-model="store.formData"
        ref="textInputRef"
        variant="solo"
        elevation="3"
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
      :title="value.address"
      :tip-ratings="value.tipRating"
      :notes="value.note"
      :hide-notes="false"
    />
  </div>
</template>

<script setup lang="ts">
  import { getUserKey } from "~/util/util";
  import _ from "lodash";
  import { useUserStore } from "~/store/store";
  import type { TipperResponse } from "~/types";
  import { useGetTippers } from "~/composables/useGetTippers";
  import type { VNodeRef } from "vue";

  const store = useUserStore();

  const userKey = getUserKey();

  const textInputRef = ref<VNodeRef | null>(null);

  if (userKey) {
    store.setUserKey(userKey);
  }

  let resCount = 0;

  const tipperArray = ref<TipperResponse[]>([]);

  async function handleInput(data: string) {
    if (!data) {
      tipperArray.value = [];
      return;
    }

    store.formData = data;

    const throttledLookup = _.debounce(useGetTippers, 150, {
      leading: true,
      trailing: false,
    });

    try {
      tipperArray.value = await throttledLookup(store.formData, resCount);
    } catch (err) {
      console.log(err);
    }
  }

  function clearInput(): void {
    store.formData = "";
    tipperArray.value = [];
  }
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
</style>
