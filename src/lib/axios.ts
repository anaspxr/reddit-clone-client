import baseAxios, { isAxiosError } from "axios";

const axios = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const axiosErrorCatch = (error: unknown): string => {
  if (isAxiosError(error)) {
    if (error.response) {
      return (
        error.response.data?.message ||
        `Error: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      return "No response received from the server. Please try again later.";
    } else {
      return `Error in request setup: ${error.message}`;
    }
  } else if (error instanceof Error) {
    return `${error.message}`;
  } else {
    return "An unknown error occurred. Please try again.";
  }
};

export default axios;
