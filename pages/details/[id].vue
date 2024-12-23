<template>
  <div class="scroll-container">
    <TipLogCard
      :title="tipperData.address"
      :tip-ratings="tipperData.tipRatings"
      :notes="tipperData.notes"
      :hide-notes="true"
    />
    <AddRating />
    <Notes />
    <TipHistory />
    <v-container class="button-container">
      <v-btn
        color="grey-darken-3"
        prepend-icon="mdi-map-marker"
        :href="mapsLink"
        class="maps-button"
        >Google Maps link
      </v-btn>
    </v-container>
  </div>
</template>

<script setup lang="ts">
  import AddRating from "~/components/AddRating.vue";
  import Notes from "~/components/Notes.vue";
  import { useUserStore } from "~/store/store";
  import { fetchCsrfCookie } from "~/util/util";

  onMounted(async () => {
    fetchCsrfCookie();
  });

  const tipperData = useUserStore();
  const mapsLink = `geo:0,0?q=${tipperData.address}`;

  interface PropObj {
    address: string;
    tipRatings: string[];
    notes: string[];
  }

  const saveProps = () => {
    const propObj: PropObj = {
      address: tipperData.address,
      tipRatings: tipperData.tipRatings,
      notes: tipperData.notes,
    };
    localStorage.setItem("props", JSON.stringify(propObj));
  };

  const getProps = () => {
    const propObj = JSON.parse(localStorage.getItem("props") || "{}");
    if (propObj.address) {
      tipperData.address = propObj.address;
      tipperData.tipRatings = propObj.tipRatings;
      tipperData.notes = propObj.notes;
    }
  };

  onBeforeMount(() => {
    if (!tipperData.address) getProps();
  });

  window.onbeforeunload = () => {
    saveProps();
  };
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

  .scroll-container {
    overflow-y: auto;
    height: 85vh;
  }
</style>
