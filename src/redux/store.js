import { createSlice, configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/authSlice";
import groupReducer from "./modules/groupSlice";

const store = configureStore({
  reducer: { auth: authReducer, group: groupReducer },
});
export default store;
