import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "./userApi";

export const updateUsers = createAsyncThunk(
  "user/updateUsers",
  async (data, thunkAPI) => {
    try {
      const id = data?._id;
      const body = {
        name: data?.name,
        position: data?.position,
        location: data?.location,
        salary: Number(data?.salary),
      };
      const res = await userApi.updateUserApi(id, body);
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

const updateUserSlice = createSlice({
  name: "updateuser",
  initialState,
  reducers: {
    resertState: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(updateUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.userData = null;
        state.isError = true;
      });
  },
});
export const { resertState } = updateUserSlice.actions;
export const updateuser = (state) => state.updateUsers;
export default updateUserSlice.reducer;
