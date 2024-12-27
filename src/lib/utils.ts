import { clsx, type ClassValue } from "clsx";
import { FileError } from "react-dropzone";
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

export const getFileErrorMessage = (error: FileError) => {
  switch (error.code) {
    case "file-invalid-type":
      return "Invalid file type. Accepted file types: jpg, jpeg, png, mp4";
    case "file-too-large":
      return "File is too large";
    case "file-too-small":
      return "File is too small";
    case "too-many-files":
      return "Too many files. Only 4 images are supported";
    default:
      return "Unknown error";
  }
};
