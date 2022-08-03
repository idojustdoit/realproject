import { createSlice } from "@reduxjs/toolkit";

const chatListSlice = createSlice({
  name: "chatList",
  initialState: [],
  reducers: {
    addChatList(state, { payload }) {
      return [payload, ...state];
    },
  },
});

export const { addChatList } = chatListSlice.actions;

export default chatListSlice.reducer;
