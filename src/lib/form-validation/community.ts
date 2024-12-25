import { z } from "zod";

export const communityNameSchema = z
  .string({ message: "Enter a community name" })
  .min(3, "At least 3 characters long")
  .regex(/^[a-zA-Z0-9]+$/, "Only letters, numbers and underscore are allowed");
