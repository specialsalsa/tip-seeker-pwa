import { useUserStore } from "~/store/store";
import { getCsrfTokenFromLocalStorage } from "~/util/util";

export const useSubmitRating = async (
  address: string,
  city: string,
  state: string,
  rating: number,
  rateLimited: boolean,
  modalOpen: boolean,
  timeRemaining: number
): Promise<void> => {
  const user = useUserStore();
  const csrfToken = getCsrfTokenFromLocalStorage();

  console.log(
    address,
    city,
    state,
    rating,
    rateLimited,
    modalOpen,
    timeRemaining
  );

  const res = await fetch(
    `https://wildlyle.dev:8020/setTipData?address=${address}, ${city}, ${state}&tipRating=${rating}&timestamp=${Date.now()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken!,
      },
    }
  );

  const json = await res.json();

  if (json.rateLimit) {
    rateLimited = true;
    modalOpen = true;
    timeRemaining = json.timeRemaining;
  }

  user.tipRatings.push(rating.toString());
};
