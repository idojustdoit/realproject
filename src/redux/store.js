import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/userSlice";
import myRoomReducer from "./modules/myRoomSlice";
import searchReducer from "./modules/searchSlice";
import todoListReducer from "./modules/todoListSlice";
import chatListReducer from "./modules/chatListSlice";

//기존 createStore(리덕스) -> configureStore(툴킷)
//configureStore()는 객체를 받는다. {reducer:{}}
const store = configureStore({
  reducer: {
    user: userReducer,
    myRoom: myRoomReducer,
    todoList: todoListReducer,
    chatList:chatListReducer,
    search: searchReducer,
  },
});
export default store;
