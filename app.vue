<script setup lang="ts">
  import { useThemeSwitcher } from "./composables/useThemeSwitcher";
  const { updateTheme, watchThemeChange } = useThemeSwitcher();

  onMounted(() => {
    updateTheme();
    watchThemeChange();
  });
</script>

<template>
  <VitePwaManifest />
  <div>
    <v-app>
      <NuxtPage page-key="index" />
      <Tabs />
    </v-app>
  </div>
</template>
