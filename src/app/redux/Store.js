import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./feature/user/UserSlice";
import getAlluserSlice from "./feature/user/getAlluserSlice";

export const store = configureStore({
  reducer: {
    getuser: UserSlice,
    getalluser: getAlluserSlice,
  },
});
