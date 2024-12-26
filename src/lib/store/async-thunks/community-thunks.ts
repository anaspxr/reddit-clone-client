import axios, { axiosErrorCatch } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCommunity = createAsyncThunk(
  "community/getCommunity",
  async (name: string, { rejectWithValue }) => {
    try {
      const { data } = await axios(`/public/community/${name}`, {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorCatch(error));
    }
  }
);
