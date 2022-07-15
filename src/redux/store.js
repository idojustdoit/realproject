import { createSlice, configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/userSlice";
import roomReducer from "./modules/roomSlice";

//기존 createStore(리덕스) -> configureStore(툴킷)
//configureStore()는 객체를 받는다. {reducer:{}}
const store = configureStore({
  reducer: { user: userReducer, room: roomReducer },
});
export default store;
