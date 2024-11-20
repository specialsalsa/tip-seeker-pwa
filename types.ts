export interface TipperData {
  address: string;
  tipRatings: string[];
}

export interface TipperResponse {
  _id: string;
  id: string;
  address: string;
  coordinates: number | null[];
  tipRating: string[];
  __v: number;
  note: string[];
  timestamp: number;
  key: number;
}
