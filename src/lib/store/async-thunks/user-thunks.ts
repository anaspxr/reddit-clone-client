import { toast } from "@/hooks/use-toast";
import { logoutClearCookie, verifyTokenForClient } from "@/lib/actions/auth";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { AuthError } from "@/lib/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

export const hydrateUser = createAsyncThunk(
  "user/hydrate",
  async (handleTokenExpire: () => void, { rejectWithValue }) => {
    try {
      // first check if the client has a valid token
      const { error } = await verifyTokenForClient();

      if (error) {
        throw new Error(error);
      }

      const { data } = await axios.get("/user/hydrate", {
        withCredentials: true,
      });
      const userData = data.data;
      return userData;
    } catch (err) {
      const error = axiosErrorCatch(err);
      // if an expiry error is thrown, set a search param to show the session ended modal
      if (
        (err instanceof AuthError && err.message === "TOKEN_EXPIRED") ||
        error === "TOKEN_EXPIRED"
      ) {
        handleTokenExpire();
      }

      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await Promise.all([
        logoutClearCookie(),
        axios.get("/auth/logout", { withCredentials: true }),
      ]);
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
      const { data } = await axios.get(`public/user/${username}`, {
        withCredentials: true,
      });
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

export const updateUserDisplayName = createAsyncThunk(
  "user/updateDisplayName",
  async (displayName: string, { rejectWithValue }) => {
    try {
      await axios.put(
        "/user/displayname",
        { displayName },
        { withCredentials: true }
      );
      return displayName;
    } catch (error) {
      toast({
        title: "Error updating display name",
        description: axiosErrorCatch(error),
      });
      return rejectWithValue(axiosErrorCatch(error));
    }
  }
);

export const updateUserAbout = createAsyncThunk(
  "user/updateAbout",
  async (about: string, { rejectWithValue }) => {
    try {
      await axios.put("/user/about", { about }, { withCredentials: true });
      return about;
    } catch (error) {
      toast({
        title: "Error updating about description",
        description: axiosErrorCatch(error),
      });
      return rejectWithValue(axiosErrorCatch(error));
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (avatar: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", avatar);
      const { data } = await axios.put("/user/avatar", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data.data.avatar;
    } catch (error) {
      toast({
        title: "Error updating avatar",
        description: axiosErrorCatch(error),
      });
      return rejectWithValue(axiosErrorCatch(error));
    }
  }
);

export const updateUserBanner = createAsyncThunk(
  "user/updateBanner",
  async (banner: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("image", banner);
      const { data } = await axios.put("/user/banner", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data.data.banner;
    } catch (error) {
      toast({
        title: "Error updating banner",
        description: axiosErrorCatch(error),
      });
      return rejectWithValue(axiosErrorCatch(error));
    }
  }
);

export const followUser = createAsyncThunk(
  "user/follow",
  async (username: string, { rejectWithValue }) => {
    try {
      await axios.post(`/user/${username}/follow`, null, {
        withCredentials: true,
      });
      return username;
    } catch (error) {
      return rejectWithValue(axiosErrorCatch(error));
    }
  }
);

export const unFollowUser = createAsyncThunk(
  "user/unfollow",
  async (username: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/user/${username}/follow`, {
        withCredentials: true,
      });
      return username;
    } catch (error) {
      return rejectWithValue(axiosErrorCatch(error));
    }
  }
);
