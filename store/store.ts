import { defineStore } from "#build/imports";
import type { StoreState } from "~/types";
import { getCsrfTokenFromCookie, getCsrfTokenFromMemory } from "~/util/util";

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
    async editNote(oldNote: string, newNote: string) {
      let csrfToken = getCsrfTokenFromMemory();

      const res = await fetch(
        `https://wildlyle.dev:8020/editNote?address=${this.address}&oldNote=${oldNote}&newNote=${newNote}`,
        {
          method: "POST",
          headers: {
            "X-Csrf-Token": csrfToken!,
          },
        }
      );
      this.notes.splice(this.notes.indexOf(oldNote), 1).push(newNote);
    },

    async addNote(newNote: string) {
      let csrfToken = getCsrfTokenFromMemory();

      if (csrfToken) {
        const res = await fetch(
          `https://wildlyle.dev:8020/setTipData?address=${this.address}&note=${newNote}`,
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
  },
});
