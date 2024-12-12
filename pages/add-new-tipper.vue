<template>
  <h1 class="page-title">Add New Tipper</h1>
  <v-dialog v-model="modalOpened" class="dialog">
    <v-card class="card-modal" rounded="lg" density="compact">
      <v-card-text>Successfully added rating! </v-card-text>
      <v-card-actions>
        <v-btn @click="closeModal" size="default">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-container class="card">
    <div class="position-button-container">
      <v-btn
        size="default"
        class="position-button"
        @click="handleGetPosition"
        prepend-icon="mdi-map-marker"
        >Use Current Position</v-btn
      >
    </div>
    <v-form
      class="form"
      @submit.prevent="
        useSubmitRating(
          address,
          city,
          state,
          rating,
          rateLimited,
          modalOpened,
          timeRemaining
        );
        openModal();
      "
    >
      <v-text-field
        class="input"
        v-model="address"
        label="Address"
      ></v-text-field>
      <v-text-field class="input" label="City" v-model="city"></v-text-field>
      <v-text-field class="input" label="State" v-model="state"></v-text-field>
      <v-radio-group v-model="rating">
        <v-radio label="No Tipper" value="1"></v-radio>
        <v-radio label="Bad Tipper" value="2"></v-radio>
        <v-radio label="Okay Tipper" value="3"></v-radio>
        <v-radio label="Good Tipper" value="4"></v-radio>
        <v-radio label="Great Tipper" value="5"></v-radio>
      </v-radio-group>
      <v-btn type="submit" class="submit-button">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
  import { reverse } from "lodash";
  import { useSubmitRating } from "~/composables/useSubmitRating";

  interface Coordinates {
    latitude: number;
    longitude: number;
  }

  const address = ref("");
  const city = ref("");
  const state = ref("");
  const rating = ref(0);
  const rateLimited = ref(false);
  const modalOpened = ref(false);
  const coords = ref();

  const handleGetPosition = async () => {
    await getPosition();
    await reverseGeolocationLookup(coords.value);
  };

  const reverseGeolocationLookup = async (coords: Coordinates) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=geojson`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const json = await res.json();

    if (json.features[0]) {
      address.value = `${json.features[0].properties.address.house_number} ${json.features[0].properties.address.road}`;
      city.value = `${
        json.features[0].properties.address.city ||
        json.features[0].properties.address.town
      }`;
      state.value = json.features[0].properties.address.state;
    }
  };

  const timeRemaining = ref(0);

  const closeModal = () => (modalOpened.value = false);
  const openModal = () => (modalOpened.value = true);

  const getPosition = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        coords.value = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      });
    }
  };
</script>

<style scoped>
  .page-title,
  .submit-button {
    display: flex;
    justify-content: center;
  }

  .dialog {
    margin: 0;
  }

  .position-button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }

  @media (min-width: 1280px) {
    .dialog {
      margin: 0 30vw;
    }
  }
</style>
