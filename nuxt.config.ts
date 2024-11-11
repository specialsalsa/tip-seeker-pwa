// https://nuxt.com/docs/api/configuration/nuxt-config
import { aliases, mdi } from "vuetify/iconsets/mdi";
export default defineNuxtConfig({
  ssr: false,
  modules: ["vuetify-nuxt-module", "@vite-pwa/nuxt"],
  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      theme: {
        defaultTheme: "dark",
      },
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
});
