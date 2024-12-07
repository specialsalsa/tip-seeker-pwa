import { defineStore } from "#build/imports";

export const useUserStore = defineStore("user", {
  state: () => ({
    address: "",
    tipRatings: [] as string[],
    notes: [] as string[],
    formData: "",
    userKey: "",
  }),
  actions: {
    addCurrentUser(address: string, tipRatings: string[], notes: string[]) {
      this.address = address;
      this.tipRatings = tipRatings;
      this.notes = notes;
    },
    setUserKey(key: string) {
      this.userKey = key;
    },
  },
});
