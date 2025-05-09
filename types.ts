export interface TipperData {
  address: string;
  tipRatings: string[];
}

export interface TipperResponse {
  _id: string;
  id: string;
  address: string;
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
  email: string;
  token: string;
  totalRatings: string;
  averageRating: string;
  loadingTokenAuth: boolean;
}
