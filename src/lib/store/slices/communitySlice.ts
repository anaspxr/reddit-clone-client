import { ICommunity } from "@/lib/types/communityTypes";
import { createSlice } from "@reduxjs/toolkit";
import { getCommunity } from "../async-thunks/community-thunks";

interface CommunityState {
  community: ICommunity | null;
  loading: boolean;
  error: string | null;
}

const initialState: CommunityState = {
  community: null,
  loading: false,
  error: null,
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCommunity.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCommunity.fulfilled, (state, action) => {
        state.community = action.payload;
        state.loading = false;
      })
      .addCase(getCommunity.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      });
  },
});

export default communitySlice.reducer;
