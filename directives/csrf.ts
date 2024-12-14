import { getCsrfTokenFromCookie } from "~/util/util";

export default {
  beforeMount(el: any) {
    const csrfToken = getCsrfTokenFromCookie();
    if (!csrfToken) {
      console.warn("CSRF token is missing.");
      return;
    }

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "_csrf";
    input.value = csrfToken;
    el.appendChild(input);
  },
};
