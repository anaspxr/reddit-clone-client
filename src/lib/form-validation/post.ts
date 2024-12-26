import { z } from "zod";

export const postTitleSchema = z
  .string({ message: "Enter a title" })
  .min(3, "At least 3 characters long");
