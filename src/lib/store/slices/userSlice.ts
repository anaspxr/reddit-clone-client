import { User } from "@/lib/types/userTypes";
import { createSlice } from "@reduxjs/toolkit";
import { hydrateUser, logoutUser } from "../async-thunks/user-thunks";

interface UserState {
  user: User | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
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
      });
  },
});

export const { stateLogin } = userSlice.actions;

export default userSlice.reducer;
