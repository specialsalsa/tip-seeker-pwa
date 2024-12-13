<script setup lang="ts">
  import { useThemeSwitcher } from "./composables/useThemeSwitcher";
  // import { fetchCsrfCookie } from "./util/util";
  const { updateTheme, watchThemeChange } = useThemeSwitcher();

  onMounted(() => {
    updateTheme();
    watchThemeChange();
    // fetchCsrfCookie();
  });
</script>
<template>
  <VitePwaManifest />
  <div>
    <v-app>
      <NuxtPage :keepalive="true" page-key="index" />
      <Tabs />
    </v-app>
  </div>
</template>
