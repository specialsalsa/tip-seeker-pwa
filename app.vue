<template>
  <VitePwaManifest />
  <div>
    <v-app>
      <v-overlay
        :model-value="store.loadingTokenAuth"
        class="align-center justify-center"
      >
        <v-progress-circular
          color="primary"
          size="64"
          indeterminate
        ></v-progress-circular>
      </v-overlay>

      <Login v-if="!store.isLoggedIn && !isLoading" />
      <div v-if="store.isLoggedIn">
        <NuxtPage page-key="index" />
        <Tabs />
      </div>
    </v-app>
  </div>
</template>

<script setup lang="ts">
  import { useAuth } from "./composables/useAuth";
  import { useThemeSwitcher } from "./composables/useThemeSwitcher";
  import { useUserStore } from "./store/store";
  const { updateTheme, watchThemeChange } = useThemeSwitcher();
  const store = useUserStore();

  const isLoading = ref(true);

  onMounted(async () => {
    await new Promise(async (resolve) => resolve(await useAuth()));
    isLoading.value = false;
    updateTheme();
    watchThemeChange();
  });
</script>
