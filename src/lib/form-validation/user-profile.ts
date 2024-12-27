import { z } from "zod";

export const displayNameSchema = z
  .string({ message: "Enter a display name" })
  .min(3, "Display name should be at least 3 characters long");

export const aboutSchema = z.string();
