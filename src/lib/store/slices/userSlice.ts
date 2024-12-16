import { User } from "@/lib/types/userTypes";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
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
    stateLogout: (state) => {
      state.user = null;
    },
  },
});

export const { stateLogin, stateLogout } = userSlice.actions;

export default userSlice.reducer;
