import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const TOKEN = localStorage.getItem("accessToken");

export const getList = createAsyncThunk("GET_TODO", async () => {
  return await axios
    .get(`${API_URL}/api/todo`)
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));
});

const todoListSlice = createSlice({
  name: "todoList",
  initialState: {
    todoList: [],
    roomNumber: 0,
  },
  reducers: {
    addTodoList(state, { payload }) {
      return [
        ...state,
        { id: payload.id, list: payload.list, checked: payload.checked },
      ];
    },
    deleteTodoList(state, { payload }) {
      const deletedState = state.filter((list) => list.id !== payload.id);
      return deletedState;
    },
    updateTodoChecked(state, { payload }) {
      const toggleState = state.map((list) =>
        list.id === payload.id ? { ...list, checked: !payload.checked } : list
      );
      return toggleState;
    },
  },
  extraReducers: {
    [getList.fulfilled]: (state, { payload }) => {
      state.todoList = [...payload];
    },
  },
});
export const { addTodoList, updateTodoChecked, deleteTodoList } =
  todoListSlice.actions;
export default todoListSlice.reducer;
