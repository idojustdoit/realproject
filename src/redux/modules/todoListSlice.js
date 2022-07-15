import { createSlice} from "@reduxjs/toolkit";

const initialTodoListState = [
  {
    id: 1,
    list: "공부시간 4시간 채우기",
    checked: false,
  },
  {
    id: 2,
    list: "'웹디자인기능가 필기 절대족보' 53P ~ 80P",
    checked: false,
  },
  {
    id: 3,
    list: "13:00 ~ 14:00 방해금지 시간",
    checked: true,
  },
  {
    id: 4,
    list: "--------------------------율찬--------------------------",
    checked: false,
  },
  {
    id: 5,
    list: "유튜브 강의 Chapter2",
    checked: false,
  },
  {
    id: 6,
    list: "유튜브 강의 Chapter3",
    checked: false,
  },
];

const todoListSlice = createSlice({
  name: "todoList",
  initialState: initialTodoListState,
  reducers: {
    addTodoList(state, { payload }) {
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
      const toggleState = state.map((list) =>
        list.id === payload.id ? { ...list, checked: !payload.checked } : list
      );
      return toggleState;
    },
  },
});

export const { addTodoList, updateTodoChecked, deleteTodoList } =
  todoListSlice.actions;


export default todoListSlice.reducer;
