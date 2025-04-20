import { useUserStore } from "~/store/store";

export const useAuth = async () => {
  const store = useUserStore();
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const res = await fetch("https://wildlyle.dev:8020/validateToken", {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    store.isLoggedIn = false;
    localStorage.removeItem("token");
    localStorage.removeItem("user_key");
    return false;
  }
  const json = await res.json();

  store.isLoggedIn = true;
  store.email = json.token.email;
  store.loadingTokenAuth = false;
  return true;
};
