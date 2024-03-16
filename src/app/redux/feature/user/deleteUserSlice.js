import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "./userApi";

export const deleteUsers = createAsyncThunk(
  "user/deleteUsers",
  async (id, thunkAPI) => {
    try {
      const res = await userApi.deleteUserApi(id);
      if (!res) {
        return thunkAPI.rejectWithValue(res);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  isLoading: false,
  isError: false,
  userData: null,
};
const deleteUserSlice = createSlice({
  name: "deleteuser",
  initialState,
  reducers: {
    resertState: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.userData = null;
        state.isError = false;
      });
  },
});
export const { resertState } = deleteUserSlice.actions;
export const updateuser = (state) => state.deleteUsers;
export default deleteUserSlice.reducer;
