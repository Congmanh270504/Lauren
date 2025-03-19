export type productType = {
  id: string;
  productName: string;
  price: number;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
  img?: {
    id: string;
    url: string;
  }[];
  Category?: categoryType;
};
export type categoryType = {
  id: string;
  categoryName: string;
  createdAt?: Date;
  updatedAt?: Date;
};
