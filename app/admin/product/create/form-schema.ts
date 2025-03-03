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
  name: z.string(),
  price: z.number(),
  category: z.number(),
  "MultiSelect-5": z
    .array(z.string())
    .nonempty("Please at least one item")
    .optional(),
});
