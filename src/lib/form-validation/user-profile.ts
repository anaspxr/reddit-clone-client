import { z } from "zod";

export const displayNameSchema = z
  .string({ message: "Enter a display name" })
  .regex(
    /^[a-zA-Z0-9]+$/,
    "Display name should only contain alphanumeric characters"
  )
  .min(3, "Display name should be at least 3 characters long");

export const aboutSchema = z.string();
