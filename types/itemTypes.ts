export type productType = {
  id?: string;
  productName: string;
  price: number;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
  img?: imagesTpye[];
  Category?: categoryType;
};
export type categoryType = {
  id: string;
  categoryName: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export type imagesTpye = {
  id: string;
  productId: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export type songType = {
  id: string;
  title: string;
  url: string;
  artist: string;
  album: string;
  genre: string;
  releaseDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
