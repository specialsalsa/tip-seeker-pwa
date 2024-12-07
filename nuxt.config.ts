// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from "fs";
import path from "path";
export default defineNuxtConfig({
  css: ["~/global-styles.css"],
  ssr: false,
  devServer: {
    // https: {
    //   key: fs
    //     .readFileSync(path.resolve(__dirname, "192.168.68.109-key.pem"))
    //     .toString(),
    //   cert: fs
    //     .readFileSync(path.resolve(__dirname, "192.168.68.109.pem"))
    //     .toString(),
    // },
  },

  modules: ["vuetify-nuxt-module", "@vite-pwa/nuxt", "@pinia/nuxt"],
  pwa: {
    devOptions: {
      enabled: true,
      type: "module",
    },

    includeAssets: [
      "favicon.ico",
      "apple-touch-icon.png",
      "web-app-manifest-192x192.png",
      "web-app-manifest-512x512.png",
    ],
    registerType: "autoUpdate",
    manifest: {
      name: "Tip Seeker",
      short_name: "TipSeeker",
      theme_color: "#ffffff",
      start_url: ".",
      display: "standalone",
      background_color: "#000000",
    },
  },

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
