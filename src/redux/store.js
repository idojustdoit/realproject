import {configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/userSlice";
import roomReducer from "./modules/roomSlice";
import todoListReducer from "./modules/todoListSlice";

//기존 createStore(리덕스) -> configureStore(툴킷)
//configureStore()는 객체를 받는다. {reducer:{}}
const store = configureStore({
  reducer: { user: userReducer, room: roomReducer, todoList: todoListReducer },
});
export default store;
