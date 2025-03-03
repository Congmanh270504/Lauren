export type productType = {
  id: string;
  productName: string;
  price: number;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
  img?: {
    id: string;
    url: string;
  }[];
};
