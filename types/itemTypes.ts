export type productType = {
  id: string;
  productName: string;
  price: number;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
  img?: Images[];
  Category?: categoryType;
};
export type categoryType = {
  id: string;
  categoryName: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export type Images = {
  id: string;
  url?: string;
  cid?: string | null;
};
