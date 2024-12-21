<template>
  <h1 class="page-title">Add New Tipper</h1>
  <v-dialog v-model="modalOpen" class="dialog">
    <v-card class="card-modal" rounded="lg" density="compact">
      <v-card-text>{{ modalText }} </v-card-text>
      <v-card-actions>
        <v-btn @click="closeModal" size="default">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-container class="card">
    <div class="position-button-container">
      <v-btn
        size="default"
        :loading="loading"
        class="position-button"
        @click="handleGetPosition"
        prepend-icon="mdi-map-marker"
        >Use Current Position
      </v-btn>
    </div>
    <v-form class="form" @submit.prevent="handleSubmit()">
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
      <div class="position-button-container">
        <v-btn type="submit" class="submit-button">Submit</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
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
  const modalOpen = ref(false);
  const modalText = ref("");
  const coords = ref();
  const loading = ref(false);

  const handleSubmit = () => {
    useSubmitRating(
      address.value,
      city.value,
      state.value,
      rating.value,
      rateLimited.value,
      modalOpen.value,
      timeRemaining.value
    ).then((result) => {
      if (typeof result === "string") {
        modalText.value = result;
        modalOpen.value = true;
      } else if (typeof result === "boolean") {
        if (!result) {
          // json.isUpdate === false
          modalText.value = "Successfully added new rating!";
          modalOpen.value = true;
        } else {
          // json.isUpdate === true
          modalText.value = "Existing rating updated!";
          modalOpen.value = true;
        }
      }
    });
  };

  const handleGetPosition = async () => {
    loading.value = true;
    await getPosition();
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

      loading.value = false;
    }
  };

  const timeRemaining = ref(0);

  const closeModal = () => (modalOpen.value = false);
  const openModal = () => (modalOpen.value = true);

  const getPosition = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        coords.value = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        await reverseGeolocationLookup({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
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
