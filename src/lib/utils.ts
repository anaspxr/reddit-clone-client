import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { FileError } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import { Message } from "./store/slices/chatSlice";

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

export const getPostedTimeDiff = (createdAt: string) => {
  const ms = Math.abs(dayjs(createdAt).diff());
  if (ms < 60000) {
    return "just now";
  } else if (ms < 3600000) {
    return `${Math.floor(ms / 60000)}m ago`;
  } else if (ms < 86400000) {
    return `${Math.floor(ms / 3600000)}h ago`;
  } else if (ms < 2419200000) {
    return `${Math.floor(ms / 86400000)}d ago`;
  } else if (ms < 29030400000) {
    return `${Math.floor(ms / 2419200000)}m ago`;
  } else {
    return `${Math.floor(ms / 2903040000)}y ago`;
  }
};

export const showMessageTime = (current: Message, next?: Message) => {
  const formatted = dayjs(current.createdAt).format("hh:mm a");

  if (current.sender !== next?.sender) {
    return formatted;
  }

  if (formatted !== dayjs(next?.createdAt).format("hh:mm a")) {
    return formatted;
  } else {
    return null;
  }
};
