// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ["vuetify-nuxt-module", "@vite-pwa/nuxt", "@pinia/nuxt"],
  pwa: {
    devOptions: {
      enabled: true,
      type: "module",
    },
    includeAssets: ["favicon.ico", "apple-touch-icon.png"],
    registerType: "autoUpdate",
    manifest: {
      name: "Tip Seeker",
      short_name: "TipSeeker",
      theme_color: "#ffffff",
      icons: [
        {
          src: "/web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
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
