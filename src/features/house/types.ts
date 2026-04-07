export interface House {
  id: number;
  address: string;
  homeowner: string;
  price: number;
  photoURL: string;
}

export type HousesPage = {
  houses: House[];
  ok: boolean;
};
