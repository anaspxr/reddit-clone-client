import { toast } from "@/hooks/use-toast";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

export const hydrateUser = createAsyncThunk(
  "user/hydrate",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/user/hydrate", {
        withCredentials: true,
      });
      const userData = data.data;
      return userData;
    } catch (err) {
      return rejectWithValue(axiosErrorCatch(err));
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get("/auth/logout", { withCredentials: true });
    } catch (err) {
      const errorString = axiosErrorCatch(err);
      toast({
        title: "Error while logging out, please try again",
        description: errorString,
      });
      return rejectWithValue(errorString);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "user/getProfile",
  async (username: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`public/user/${username}`);
      return data.data;
    } catch (error) {
      if (isAxiosError(error) && error.status === 404) {
        rejectWithValue("NOT_FOUND");
      } else {
        rejectWithValue(axiosErrorCatch(error));
      }
    }
  }
);
