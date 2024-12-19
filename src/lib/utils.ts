import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class AuthError {
  message:
    | "NO_TOKEN"
    | "TOKEN_EXPIRED"
    | "INVALID_TOKEN"
    | "INVALID_USER"
    | "INTERNAL_ERROR"
    | "UNAUTHORIZED"
    | "NO_JWT_SECRET";
  constructor(
    message:
      | "NO_TOKEN"
      | "TOKEN_EXPIRED"
      | "INVALID_TOKEN"
      | "INVALID_USER"
      | "INTERNAL_ERROR"
      | "UNAUTHORIZED"
      | "NO_JWT_SECRET"
  ) {
    this.message = message;
  }
}
