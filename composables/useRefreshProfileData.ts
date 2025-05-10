import { useUserStore } from "~/store/store";

export const useRefreshProfileData = async () => {
  const store = useUserStore();

  try {
    const res = await fetch(
      `https://wildlyle.dev:8020/getTotalRatings?userKey=${store.userKey}`
    );
    const json = await res.json();
    store.totalRatings = json.totalRatings;
  } catch (err) {
    console.log(err);
  }

  try {
    const res = await fetch(
      `https://wildlyle.dev:8020/getRatingAverage?userKey=${store.userKey}`
    );
    const json = await res.json();
    store.averageRating = json.averageRating;
  } catch (err) {
    console.log(err);
  }
};
