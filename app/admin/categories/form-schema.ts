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
  categoryName: z
    .string({ message: "Category name is required" })
    .min(3, { message: "Category name must be at least 3 characters long" })
    .max(255, { message: "Category name must be at most 255 characters long" }),
});
