import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "";

// Get All Posting
export const getAllListsDB = createAsyncThunk("GET/getAllLists", async () => {
  return await axios.get(`${BASE_URL}/room`).then((res) => res.data);
});

const initialGroupState = {
  roomList: [],
  cateroom: [],
  modalState: false,
  roomState: {
    roomId: null,
    privateState: false,
  },
  endModalState: false,
};
//✅slice가 여러개라도 store은 하나인 것을 명심하세요.

//createSlice()는 객체를 인자로 가지는데
//1. 슬라이스 이름 name
//2. 초기값 initialState
//3. reducers 리듀서들
const groupSlice = createSlice({
  name: "group",
  initialState: initialGroupState,
  reducers: {
    getAllListsDB(state, action) {},
  },
});

//actions는 컴포넌트에서 불러올때 쓰인다.
export const groupActions = groupSlice.actions;
//리듀서는 store로 불러와서 리듀서들끼리 뭉쳐놓을 때 쓰인다. => configureStore()에 꼭 들어가야하는게 (각 슬라이스의)리듀서라서 얘를 내보내준다.
export default groupSlice.reducer;
