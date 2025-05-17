export type Profile = {
  id: number;
  tag: string;
  username: string;
  rating: {
    quantity: number;
    average: number;
  };
};