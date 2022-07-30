import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const TOKEN = localStorage.getItem("accessToken");

// 검색된 키워드의 리스트 가져오기
export const getSearchRooms = createAsyncThunk(
  "GET/getSearchList",
  async (word) => {
    return await axios
      .get(`${API_URL}/api/room/search/${word}`)
      .then((res) => res.data)
      .catch((e) => console.log(e));
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchRooms: [],
    isLoading: false,
    word: "",
  },
  reducers: {
    //메인페이지에서 서치페이지 전에 검색하는 기본 검색값
    //서치페이지에서 검색하는 검색값
    setWord(state, action) {
      state.word = action.payload;
    },
  },
  extraReducers: {
    [getSearchRooms.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getSearchRooms.fulfilled]: (state, action) => {
      state.searchRooms = [...action.payload?.roomArr];
      state.isLoading = false;
    },
  },
});

export const { setCategoryState, setWord } = searchSlice.actions;
//리듀서는 store로 불러와서 리듀서들끼리 뭉쳐놓을 때 쓰인다. => configureStore()에 꼭 들어가야하는게 (각 슬라이스의)리듀서라서 얘를 내보내준다.
export default searchSlice.reducer;
