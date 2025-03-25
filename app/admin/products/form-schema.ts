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
  productName: z
    .string({ message: "Product name is required" })
    .min(3, { message: "Product name must be at least 3 characters long" })
    .max(255, { message: "Product name must be at most 255 characters long" }),
  price: z.coerce
    .number()
    .min(0.5, { message: "Price must be at least 0.5" })
    .max(1000000, { message: "Price must be at most 1000000" }),
  categoryId: z.string().nonempty({ message: "Category is required" }),
  productsImages: z
    .array(z.string().nonempty(""))
    .min(1, { message: "At least 1 image" }), 
});
