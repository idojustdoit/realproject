import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_ID } from "../../shared/apis";

const API_URL = process.env.REACT_APP_API_URL;

const TOKEN = localStorage.getItem("accessToken");

//방(room) 생성
export const addRoom = createAsyncThunk("ADD/addRoom", async (formData) => {
  const res = await axios.post(`${API_URL}/api/room/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return res.data;
});

//메인 room list 불러오기
export const getMainList = createAsyncThunk("POST/getRoom", async () => {
  return await axios
    .post(`${API_URL}/api/main/tag/전체`)
    .then((res) => res.data);
  // .catch((e) => rejectWithValue(e.message));
});

//카테고리별 리스트 가져오기
//😎에러핸들링 2번째 인자로 thunkAPI를 받을 수 있다.
export const getRoomListByCategory = createAsyncThunk(
  "POST/getRoomListByCategory",
  async (clickedCategory, { rejectWithValue }) => {
    console.log(clickedCategory);
    return await axios
      .post(`${API_URL}/api/main/tag/${clickedCategory}`)
      .then((res) => res.data)
      .catch((e) => rejectWithValue(e.message));
  }
);

//쿼리 예제
export const getListEx = createAsyncThunk(
  "POST/getListEx",

  async (data) => {
    console.log(data);
    return await axios
      .get(
        `${API_URL}/api/?roomCategory=${data.category}&page=${data.page}&limit=${data.limit}`
      )
      .then((res) => res.data);
  }
);

// room 찜하기(좋아요) 기능
// 버튼 클릭 시 서버로 roomId 보내주기(클릭한 유저가 어떤 유저인지 토큰으로 확인가능?)
export const setlikedRoom = createAsyncThunk(
  "POST/likedRoom",
  async (roomId) => {
    const res = await axios
      .post(
        `${API_URL}/api/room/like/${roomId}`,
        {},
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      )
      .then((res) => res.data);
    return res.data;
  }
);

// 검색된 키워드의 리스트 가져오기
export const getSearchRooms = createAsyncThunk(
  "GET/getSearchList",
  async (word) => {
    console.log(word);
    return await axios
      .get(`${API_URL}/api/room/search/${word}`)
      .then((res) => res.data);
  }
);

//마이페이지 정보 가져오기
export const getMypageInfos = createAsyncThunk(
  "GET/getMypageInfos",
  async () => {
    return await axios
      .get(`${API_URL}/api/mypage/${USER_ID}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => res.data);
  }
);

//isLoading true- 로딩중이다. false -로딩끝! 데이터 가져왔음or 실패함
const roomSlice = createSlice({
  name: "room",
  initialState: {
    category: "전체",
    roomList: [],
    // enteredRooms: [],
    // hostingRooms: [],
    // likedRooms: [],
    searchRooms: [],
    modalState: false,
    isLoading: false,
    searchWord: "",
  },
  reducers: {
    setCategoryState(state, action) {
      //roomList 의존성 배열에 넣어주는 category값 설정
      state.category = action.payload;
    },
    //메인페이지에서 서치페이지 전에 검색하는 기본 검색값
    setInitialWord(state, action) {
      state.initialWord = action.payload;
    },
    //서치페이지에서 검색하는 검색값
    setSearchWord(state, action) {
      state.searchWord = action.payload;
    },
  },
  extraReducers: {
    [getMainList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getMainList.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.roomList = [...action.payload.roomList];
      state.isLoading = false;
    },
    [getMainList.rejected]: (state, action) => {
      state.isLoading = true;
      alert("메인리스트 불러오기 거부됨");
      console.log("메인리스트" + action.payload);
    },
    [getRoomListByCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getRoomListByCategory.fulfilled]: (state, action) => {
      state.roomList = [...action.payload?.roomList];
      state.isLoading = false;
    },
    [getRoomListByCategory.rejected]: (state, action) => {
      console.log(action.payload); //e.g. Net work error
      state.roomList = [...action.payload?.roomList];
      state.isLoading = false;
    },
    [getListEx.rejected]: (state, action) => {
      state.isLoading = true;
    },
    [getSearchRooms.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getSearchRooms.fulfilled]: (state, action) => {
      state.searchRooms = [...action.payload?.roomList];
      state.isLoading = false;
    },
    [getMypageInfos.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getMypageInfos.fulfilled]: (state, action) => {
      state.state.roomList = [...action.payload.roomList];
      state.isLoading = false;
    },
  },
});

//actions는 컴포넌트에서 불러올때 쓰인다.
export const { setCategoryState, setSearchWord, setInitialWord } =
  roomSlice.actions;
//리듀서는 store로 불러와서 리듀서들끼리 뭉쳐놓을 때 쓰인다. => configureStore()에 꼭 들어가야하는게 (각 슬라이스의)리듀서라서 얘를 내보내준다.
export default roomSlice.reducer;
