import { createSlice, configureStore } from "@reduxjs/toolkit";
import { list } from "firebase/storage";

const todoListSlice = createSlice({
  name: "todoList",
  initialState: [],
  reducers: {
    addTodoList(state, { payload }) {
      console.log(payload);
      return [
        ...state,
        {
          id: payload.id,
          list: payload.list,
          checked: payload.checked,
        },
      ];
    },
    deleteTodoList(state, { payload }) {
      const deletedState = state.filter((list) => list.id !== payload.id);
      return deletedState;
    },
    updateTodoChecked(state, { payload }) {
      const updateState = state.map((list) =>
        list.id === payload.id ? { ...list, checked: !payload.checked } : list
      );
      return updateState;
    },
  },
});

const store = configureStore({
  reducer: todoListSlice.reducer,
});

export const { addTodoList, updateTodoChecked, deleteTodoList } =
  todoListSlice.actions;

export default store;
