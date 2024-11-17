import { defineStore } from "#build/imports";

export const useUserStore = defineStore("user", {
  state: () => ({
    address: "",
    tipRatings: [] as string[],
    notes: [] as string[],
    formData: "",
  }),
  actions: {
    addCurrentUser(address: string, tipRatings: string[], notes: string[]) {
      this.address = address;
      this.tipRatings = tipRatings;
      this.notes = notes;
    },
  },
});
