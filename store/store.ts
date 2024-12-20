import { defineStore } from "#build/imports";
import type { StoreState } from "~/types";
import { getCsrfTokenFromMemory } from "~/util/util";

export const useUserStore = defineStore("user", {
  state: (): StoreState => ({
    address: "",
    tipRatings: [],
    notes: [],
    formData: "",
    userKey: "",
    csrfToken: "",
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
      let csrfToken = getCsrfTokenFromMemory();

      const res = await fetch(
        `https://wildlyle.dev:8020/editNote?address=${this.address.toLowerCase()}&oldNote=${oldNote}&newNote=${newNote}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "X-Csrf-Token": csrfToken!,
          },
        }
      );
      this.notes.splice(index, 1, newNote);
    },

    async addNote(newNote: string) {
      let csrfToken = getCsrfTokenFromMemory();

      if (csrfToken) {
        const res = await fetch(
          `https://wildlyle.dev:8020/setTipData?address=${this.address.toLowerCase()}&note=${newNote}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "X-Csrf-Token": csrfToken,
            },
          }
        );
      }

      this.notes.push(newNote);
    },
    async deleteNote(note: string) {
      let csrfToken = getCsrfTokenFromMemory();

      if (csrfToken) {
        const res = await fetch(
          `https://wildlyle.dev:8020/deleteNote?address=${this.address.toLowerCase()}&note=${note}`,
          {
            method: "GET",
            headers: {
              "X-Csrf-Token": csrfToken,
            },
          }
        );
      }
    },
  },
});
