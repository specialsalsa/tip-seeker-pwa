import { defineStore } from "#build/imports";
import type { StoreState } from "~/types";

export const useUserStore = defineStore("user", {
  state: (): StoreState => ({
    address: "",
    tipRatings: [],
    notes: [],
    formData: "",
    userKey: "",
    token: "",
    email: "",
    loadingTokenAuth: false,
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

    async editNote(index: number, oldNote: string, newNote: string) {
      const res = await fetch(
        `https://wildlyle.dev:8020/editNote?address=${this.address.toLowerCase()}&oldNote=${oldNote}&newNote=${newNote}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      this.notes.splice(index, 1, newNote);
    },

    async addNote(newNote: string) {
      const res = await fetch(
        `https://wildlyle.dev:8020/setTipData?address=${this.address.toLowerCase()}&note=${newNote}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      this.notes.push(newNote);
    },
    async deleteNote(note: string) {
      const res = await fetch(
        `https://wildlyle.dev:8020/deleteNote?address=${this.address.toLowerCase()}&note=${note}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
    },
  },
});
