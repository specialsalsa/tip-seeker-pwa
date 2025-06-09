// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ["vuetify-nuxt-module", "@vite-pwa/nuxt", "@pinia/nuxt"],
  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      theme: {
        defaultTheme: "dark",
        themes: {
          light: {
            colors: {
              background: "#000000",
              primary: "#FF0000",
            },
          },
        },
      },
    },
  },
  compatibilityDate: "2024-11-18",
  devtools: { enabled: true },
});
