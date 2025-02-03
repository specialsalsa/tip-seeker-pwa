import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export const getStateAbbreviation = (fullName: string): string => {
  if (!fullName) return "";
  const abbreviations = [
    { name: "Alabama", abbreviation: "AL" },
    { name: "Alaska", abbreviation: "AK" },
    { name: "Arizona", abbreviation: "AZ" },
    { name: "Arkansas", abbreviation: "AR" },
    { name: "California", abbreviation: "CA" },
    { name: "Colorado", abbreviation: "CO" },
    { name: "Connecticut", abbreviation: "CT" },
    { name: "Delaware", abbreviation: "DE" },
    { name: "Florida", abbreviation: "FL" },
    { name: "Georgia", abbreviation: "GA" },
    { name: "Hawaii", abbreviation: "HI" },
    { name: "Idaho", abbreviation: "ID" },
    { name: "Illinois", abbreviation: "IL" },
    { name: "Indiana", abbreviation: "IN" },
    { name: "Iowa", abbreviation: "IA" },
    { name: "Kansas", abbreviation: "KS" },
    { name: "Kentucky", abbreviation: "KY" },
    { name: "Louisiana", abbreviation: "LA" },
    { name: "Maine", abbreviation: "ME" },
    { name: "Maryland", abbreviation: "MD" },
    { name: "Massachusetts", abbreviation: "MA" },
    { name: "Michigan", abbreviation: "MI" },
    { name: "Minnesota", abbreviation: "MN" },
    { name: "Mississippi", abbreviation: "MS" },
    { name: "Missouri", abbreviation: "MO" },
    { name: "Montana", abbreviation: "MT" },
    { name: "Nebraska", abbreviation: "NE" },
    { name: "Nevada", abbreviation: "NV" },
    { name: "New Hampshire", abbreviation: "NH" },
    { name: "New Jersey", abbreviation: "NJ" },
    { name: "New Mexico", abbreviation: "NM" },
    { name: "New York", abbreviation: "NY" },
    { name: "North Carolina", abbreviation: "NC" },
    { name: "North Dakota", abbreviation: "ND" },
    { name: "Ohio", abbreviation: "OH" },
    { name: "Oklahoma", abbreviation: "OK" },
    { name: "Oregon", abbreviation: "OR" },
    { name: "Pennsylvania", abbreviation: "PA" },
    { name: "Rhode Island", abbreviation: "RI" },
    { name: "South Carolina", abbreviation: "SC" },
    { name: "South Dakota", abbreviation: "SD" },
    { name: "Tennessee", abbreviation: "TN" },
    { name: "Texas", abbreviation: "TX" },
    { name: "Utah", abbreviation: "UT" },
    { name: "Vermont", abbreviation: "VT" },
    { name: "Virginia", abbreviation: "VA" },
    { name: "Washington", abbreviation: "WA" },
    { name: "West Virginia", abbreviation: "WV" },
    { name: "Wisconsin", abbreviation: "WI" },
    { name: "Wyoming", abbreviation: "WY" },
  ];

  const abbr = abbreviations.find((state) => state.name === fullName);

  if (abbr) {
    return abbr.abbreviation.toLowerCase();
  }

  return fullName.toUpperCase();
};

const abbreviations = [
  { name: "Alabama", abbreviation: "AL" },
  { name: "Alaska", abbreviation: "AK" },
  { name: "Arizona", abbreviation: "AZ" },
  { name: "Arkansas", abbreviation: "AR" },
  { name: "California", abbreviation: "CA" },
  { name: "Colorado", abbreviation: "CO" },
  { name: "Connecticut", abbreviation: "CT" },
  { name: "Delaware", abbreviation: "DE" },
  { name: "Florida", abbreviation: "FL" },
  { name: "Georgia", abbreviation: "GA" },
  { name: "Hawaii", abbreviation: "HI" },
  { name: "Idaho", abbreviation: "ID" },
  { name: "Illinois", abbreviation: "IL" },
  { name: "Indiana", abbreviation: "IN" },
  { name: "Iowa", abbreviation: "IA" },
  { name: "Kansas", abbreviation: "KS" },
  { name: "Kentucky", abbreviation: "KY" },
  { name: "Louisiana", abbreviation: "LA" },
  { name: "Maine", abbreviation: "ME" },
  { name: "Maryland", abbreviation: "MD" },
  { name: "Massachusetts", abbreviation: "MA" },
  { name: "Michigan", abbreviation: "MI" },
  { name: "Minnesota", abbreviation: "MN" },
  { name: "Mississippi", abbreviation: "MS" },
  { name: "Missouri", abbreviation: "MO" },
  { name: "Montana", abbreviation: "MT" },
  { name: "Nebraska", abbreviation: "NE" },
  { name: "Nevada", abbreviation: "NV" },
  { name: "New Hampshire", abbreviation: "NH" },
  { name: "New Jersey", abbreviation: "NJ" },
  { name: "New Mexico", abbreviation: "NM" },
  { name: "New York", abbreviation: "NY" },
  { name: "North Carolina", abbreviation: "NC" },
  { name: "North Dakota", abbreviation: "ND" },
  { name: "Ohio", abbreviation: "OH" },
  { name: "Oklahoma", abbreviation: "OK" },
  { name: "Oregon", abbreviation: "OR" },
  { name: "Pennsylvania", abbreviation: "PA" },
  { name: "Rhode Island", abbreviation: "RI" },
  { name: "South Carolina", abbreviation: "SC" },
  { name: "South Dakota", abbreviation: "SD" },
  { name: "Tennessee", abbreviation: "TN" },
  { name: "Texas", abbreviation: "TX" },
  { name: "Utah", abbreviation: "UT" },
  { name: "Vermont", abbreviation: "VT" },
  { name: "Virginia", abbreviation: "VA" },
  { name: "Washington", abbreviation: "WA" },
  { name: "West Virginia", abbreviation: "WV" },
  { name: "Wisconsin", abbreviation: "WI" },
  { name: "Wyoming", abbreviation: "WY" },
];

export const replaceWithAbbreviation = (
  address: string,
  isAbbreviation: boolean
) => {
  if (!address) return;

  for (let state of abbreviations) {
    if (isAbbreviation) {
      if (address.includes(state.abbreviation.toLowerCase())) {
        address = address.replace(
          `, ${state.abbreviation.toLowerCase()}`,
          `, ${state.abbreviation.toUpperCase()}`
        );
      }
    } else {
      if (address.includes(state.name)) {
        address = address.replace(state.name, state.abbreviation);
      }
    }
  }

  return address;
};

interface IStates {
  [abbreviation: string]: string;
}

const states: IStates = {
  al: "AL",
  ak: "AK",
  az: "AZ",
  ar: "AR",
  ca: "CA",
  co: "CO",
  ct: "CT",
  de: "DE",
  fl: "FL",
  ga: "GA",
  hi: "HI",
  id: "ID",
  il: "IL",
  in: "IN",
  ia: "IA",
  ks: "KS",
  ky: "KY",
  la: "LA",
  me: "ME",
  md: "MD",
  ma: "MA",
  mi: "MI",
  mn: "MN",
  ms: "MS",
  mo: "MO",
  mt: "MT",
  ne: "NE",
  nv: "NV",
  nh: "NH",
  nj: "NJ",
  nm: "NM",
  ny: "NY",
  nc: "NC",
  nd: "ND",
  oh: "OH",
  ok: "OK",
  or: "OR",
  pa: "PA",
  ri: "RI",
  sc: "SC",
  sd: "SD",
  tn: "TN",
  tx: "TX",
  ut: "UT",
  vt: "VT",
  va: "VA",
  wa: "WA",
  wv: "WV",
  wi: "WI",
  wy: "WY",
};

export const handleStarRating = (rating: number, low: number, high: number) => {
  if (rating < low) {
    return "mdi-star-outline";
  } else if (rating >= low && rating < high) {
    return "mdi-star-half-full";
  } else if (rating >= high) {
    return "mdi-star";
  }
};

function replaceLastStateAbbreviation(address: string) {
  const reversedAddress = address.split("").reverse().join("");

  const reversedStates = Object.keys(states).reduce((acc: any, key) => {
    acc[key.split("").reverse().join("")] = states[key];
    return acc;
  }, {});

  const stateRegex = new RegExp(
    `\\b(${Object.keys(reversedStates).join("|")})(?=\\b|\\s|,|$)`,
    "i"
  );

  const replacedReversedAddress = reversedAddress.replace(
    stateRegex,
    (match) => {
      return reversedStates[match.toLowerCase()].split("").reverse().join("");
    }
  );

  return replacedReversedAddress.split("").reverse().join("");
}

export const setUserKey = (): string => {
  const userKey = nanoid();
  try {
    localStorage.setItem("user_key", userKey);
  } catch (err) {
    console.log("Saving error: ", err);
  }
  return userKey;
};

export const getUserKey = (): string => {
  let userKey: string | undefined | null = localStorage.getItem("user_key");

  if (userKey !== null) {
    console.log("Key already stored");
  } else {
    userKey = setUserKey();
  }
  return userKey;
};

export function capitalizeFirstLetter(words: string): string {
  if (!words) return "";
  words = replaceLastStateAbbreviation(words);

  const wordsArray = words.split(" ");
  let capitalizedArray = wordsArray.map((word) => {
    if (abbreviations.map((abb) => abb.abbreviation).includes(word))
      return word;
    return word[0].toUpperCase() + word.substring(1);
  });

  // const state = capitalizedArray[capitalizedArray.length - 1].toUpperCase();
  // capitalizedArray.splice(capitalizedArray.length - 1, 1, state);
  return capitalizedArray.join(" ");
}
