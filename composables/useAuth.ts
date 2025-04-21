import { useUserStore } from "~/store/store";

export const useAuth = async () => {
  const store = useUserStore();

  const token = localStorage.getItem("token");
  if (!token) return false;

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
    localStorage.removeItem("token");
    return false;
  }
  store.token = token;
  const json = await res.json();
  store.email = json.token.email;
  store.loadingTokenAuth = false;
  return true;
};
