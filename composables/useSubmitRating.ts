import { useUserStore } from "~/store/store";
import { getCsrfTokenFromMemory, getStateAbbreviation } from "~/util/util";

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
  const csrfToken = getCsrfTokenFromMemory();

  const res = await fetch(
    `https://wildlyle.dev:8020/setTipData?address=${address
      .trim()
      .toLowerCase()}, ${city.trim().toLowerCase()}, ${getStateAbbreviation(
      state
    )}&tipRating=${rating}&timestamp=${Date.now()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Csrf-Token": csrfToken!,
      },
    }
  );

  const json = await res.json();

  if (json.rateLimit) {
    rateLimited = true;
    modalOpen = true;
    timeRemaining = json.timeRemaining;
  } else {
    rateLimited = false;
    modalOpen = true;
  }

  user.tipRatings.push(rating.toString());
};
