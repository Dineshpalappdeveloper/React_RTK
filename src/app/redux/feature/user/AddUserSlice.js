import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "./userApi";

export const addusers = createAsyncThunk(
  "user/adduser",
  async (data, thunkAPI) => {
    try {
      const body = {
        name: data?.name,
        position: data?.position,
        location: data?.location,
        salary: Number(data?.salary),
      };
      const res = await userApi.addUsersApi(body);
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
  userdata: null,
};
const AddUserSlice = createSlice({
  name: "adduser",
  initialState,
  reducers: {
    resertState: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userdata = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adduser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(adduser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userdata = action.payload;
      })
      .addCase(adduser.rejected, (state, action) => {
        state.isLoading = false;
        state.userdata = null;
        state.isError = true;
      });
  },
});
export const { resertState } = AddUserSlice.actions;
export const adduser = (state) => state.adduser;
export default AddUserSlice.reducer;
