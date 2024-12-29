import { User, UserProfile } from "@/lib/types/userTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  followUser,
  getUserCommunities,
  getUserProfile,
  hydrateUser,
  logoutUser,
  unFollowUser,
  updateUserAbout,
  updateUserAvatar,
  updateUserBanner,
  updateUserDisplayName,
} from "../async-thunks/user-thunks";

interface UserState {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  userProfileLoading: boolean;
  userProfileError: string | null;
  communities: { name: string; icon?: string }[];
}

const initialState: UserState = {
  user: null,
  userProfile: null,
  loading: false,
  userProfileLoading: false,
  userProfileError: null,
  communities: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    stateLogin: (
      state,
      action: {
        payload: User;
      }
    ) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(hydrateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(hydrateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(hydrateUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getUserProfile.pending, (state) => {
        state.userProfileLoading = true;
        state.userProfileError = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.userProfileLoading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.userProfileError = action.payload as string;
        state.userProfileLoading = false;
      })

      .addCase(updateUserDisplayName.fulfilled, (state, action) => {
        if (state.userProfile) {
          state.userProfile.displayName = action.payload;
        }
      })
      .addCase(updateUserAbout.fulfilled, (state, action) => {
        if (state.userProfile) {
          state.userProfile.about = action.payload;
        }
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        if (state.userProfile) {
          state.userProfile.avatar = action.payload;
        }
        if (state.user) {
          state.user.avatar = action.payload;
        }
      })
      .addCase(updateUserBanner.fulfilled, (state, action) => {
        if (state.userProfile) {
          state.userProfile.banner = action.payload;
        }
      })
      .addCase(followUser.fulfilled, (state) => {
        if (state.userProfile) {
          state.userProfile.userIsFollowing = true;
          state.userProfile.followers++;
        }
      })
      .addCase(unFollowUser.fulfilled, (state) => {
        if (state.userProfile) {
          state.userProfile.userIsFollowing = false;
          state.userProfile.followers--;
        }
      })
      .addCase(getUserCommunities.fulfilled, (state, action) => {
        state.communities = action.payload;
      });
  },
});

export const { stateLogin } = userSlice.actions;

export default userSlice.reducer;
