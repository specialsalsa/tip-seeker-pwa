export interface TipperData {
  address: string;
  tipRatings: string[];
}

export interface TipperResponse {
  _id: string;
  id: string;
  address: `${number} ${string}`;
  coordinates: number[] | [];
  tipRating: string[];
  __v: number;
  note: string[];
  timestamp: number;
  key: number;
}

export interface StoreState {
  address: string;
  tipRatings: string[];
  notes: string[];
  formData: string;
  userKey: string;
  csrfToken: string;
}
