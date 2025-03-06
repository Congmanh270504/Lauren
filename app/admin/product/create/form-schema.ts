import * as z from "zod";

export interface ActionResponse<T = any> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}
export const formSchema = z.object({
  productName: z.string(),
  price: z.number(),
  categoryId: z.number(),
  productsImages: z.array(z.string()),
});
