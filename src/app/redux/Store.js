import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./feature/user/UserSlice";

export const store = configureStore({
  reducer: {
    getuser: UserSlice,
  },
});
