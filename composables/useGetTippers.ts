import { useUserStore } from "~/store/store";
import type { TipperResponse } from "~/types";
import { capitalizeFirstLetter } from "~/util/util";
import { getCsrfTokenFromMemory } from "~/util/util";

export const useGetTippers = async (
  data: string,
  resCount: number
): Promise<TipperResponse[]> => {
  const store = useUserStore();
  const csrfToken = getCsrfTokenFromMemory();

  const userKey = store.userKey;
  try {
    const res = await fetch(
      `https://wildlyle.dev:8020/lookupTippers${process.env.SUPER_SECRET_PRO_KEY}?address=${data}&userKey=${userKey}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Csrf-Token": csrfToken!,
        },
      }
    );

    const json = await res.json();

    resCount++;

    if (json) {
      return json.map(
        (order: TipperResponse, index: number): TipperResponse => {
          return {
            ...order,
            address: capitalizeFirstLetter(order.address),
            key: index + resCount * 10 + 1,
          };
        }
      );
    }
  } catch (err) {
    console.log(err);
  }

  return [];
};
