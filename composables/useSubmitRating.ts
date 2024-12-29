import { useUserStore } from "~/store/store";
import { getCsrfTokenFromMemory, getStateAbbreviation } from "~/util/util";

export const useSubmitRating = async (
  address: Ref<string>,
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

  console.log(address.toString());

  const invalidFields = Object.entries({
    address,
    city,
    state,
    note,
  })
    .filter(([key, value]) => value.toString().length > 100)
    .map((field) => " " + field[0]);

  if (invalidFields.length) {
    return `${invalidFields} reached maximum length, try again with shorter input`;
  }

  try {
    const res = await fetch(
      `https://wildlyle.dev:8020/setTipData?address=${address
        .toString()
        .trim()
        .toLowerCase()}, ${city.trim().toLowerCase()}, ${getStateAbbreviation(
        state
      )
        .toLowerCase()
        .trim()}&tipRating=${rating}&note=${note}&timestamp=${Date.now()}&userKey=${
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

    if (!res.ok) {
      return "Something went wrong, try again";
    }

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
    return "Something went wrong, try again later";
  }
};
