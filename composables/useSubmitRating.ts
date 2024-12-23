import { useUserStore } from "~/store/store";
import { getCsrfTokenFromMemory, getStateAbbreviation } from "~/util/util";

export const useSubmitRating = async (
  address: string,
  city: string,
  state: string,
  rating: number,
  note: string,
  rateLimited: boolean,
  modalOpen: boolean,
  timeRemaining: number
): Promise<string | void> => {
  const user = useUserStore();
  const csrfToken = getCsrfTokenFromMemory();
  if (!address || !city || !state || !rating) {
    return "Please fill out all fields before submitting";
  }
  if (
    address.length > 100 ||
    city.length > 100 ||
    state.length > 100 ||
    note.length > 200
  ) {
    return "A field reached maximum length, try again with shorter input";
  }

  try {
    const res = await fetch(
      `https://wildlyle.dev:8020/setTipData?address=${address
        .trim()
        .toLowerCase()}, ${city.trim().toLowerCase()}, ${getStateAbbreviation(
        state
      ).toLowerCase()}&tipRating=${rating}&note=${note}&timestamp=${Date.now()}&userKey=${
        user.userKey
      }`,
      {
        method: "POST",
        credentials: "include",
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
    return json.isUpdate;
  } catch (err) {
    return "Error submitting rating: Network Error";
  }
};
