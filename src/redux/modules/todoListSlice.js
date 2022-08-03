import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const TOKEN = localStorage.getItem("accessToken");

export const getList = createAsyncThunk("GET_TODO", async (roomId) => {
  return await axios
    .get(`${API_URL}/api/todo/${roomId}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
    .then((response) => response.data.todos);
});

export const addList = createAsyncThunk("POST_TODO", async (payload) => {
  const roomId = payload.roomId;
  const data = {
    text: payload.text,
    checkBox: payload.checkBox,
  };
  return await axios.post(`${API_URL}/api/todo/input/${roomId}`, data, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  }).then(response=>response.data.todos);
});

export const updateCheckBox = createAsyncThunk(
  "PUT_CHECKBOX",
  async (payload) => {
    const todoId = payload.todoId;
    const data = {
      text: payload.text,
      checkBox: payload.checkBox,
    };
    return await axios
      .put(`${API_URL}/api/todo/${todoId}`, data, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      })
      .then((response) => response.data.todos);
  }
);
export const deleteList = createAsyncThunk("DELETE_TODO", async (payload) => {
  const todoId = payload.todoId
  await axios
    .delete(`${API_URL}/api/todo/remove/${todoId}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
    return todoId;
});

const todoListSlice = createSlice({
  name: "todoList",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getList.fulfilled]: (state, { payload }) => [...payload],
    [addList.fulfilled]: (state, { payload }) => [...state, payload],
    [updateCheckBox.fulfilled]: (state, { payload }) => 
      state.map((list) =>
        list.todoId === payload.todoId
          ? { ...list, checkBox: payload.checkBox }
          : list
      ),
    
    [deleteList.fulfilled]: (state, { payload }) => 
      state.filter((list) => list.todoId !== payload),
    
  },
});
export const { addTodoList, updateTodoChecked, deleteTodoList } =
  todoListSlice.actions;
export default todoListSlice.reducer;
