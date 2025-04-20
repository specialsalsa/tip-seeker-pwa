import { useUserStore } from "~/store/store";

export const useAuth = async () => {
  const store = useUserStore();

  const token = localStorage.getItem("token");
  if (!token) return;

  store.loadingTokenAuth = true;
  const res = await fetch("https://wildlyle.dev:8020/validateToken", {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    store.token = "";
    localStorage.removeItem("user_key");
    return false;
  }
  const json = await res.json();
  store.token = json.token;
  store.email = json.token.email;
  store.loadingTokenAuth = false;
  return true;
};
