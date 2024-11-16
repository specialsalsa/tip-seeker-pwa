import { defineStore } from "#build/imports";

export const useUserStore = defineStore("user", {
  state: () => ({
    address: "",
    tipRatings: [] as string[],
  }),
  actions: {
    addCurrentUser(address: string, tipRatings: string[]) {
      this.address = address;
      this.tipRatings = tipRatings;
    },
  },
});
