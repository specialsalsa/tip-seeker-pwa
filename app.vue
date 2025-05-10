<template>
  <VitePwaManifest />
  <div>
    <v-app>
      <v-overlay
        v-model="store.loadingTokenAuth"
        class="align-center justify-center"
      >
        <v-progress-circular
          color="primary"
          size="64"
          indeterminate
        ></v-progress-circular>
      </v-overlay>

      <Login v-if="!store.token && !isLoading" />
      <div v-if="store.token">
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
  import { getUserKey } from "./util/util";
  const { updateTheme, watchThemeChange } = useThemeSwitcher();
  const store = useUserStore();

  const isLoading = ref(true);

  onMounted(async () => {
    await new Promise(async (resolve) => resolve(await useAuth()));
    store.userKey = getUserKey();
    isLoading.value = false;
    updateTheme();
    watchThemeChange();
    useRefreshProfileData();
  });
  watch(() => store.tipRatings, useRefreshProfileData, { deep: true });
</script>
