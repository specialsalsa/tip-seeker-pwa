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
    return false;
  }

  store.isLoggedIn = true;
  store.loadingTokenAuth = false;
  return true;
};
