import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://3.35.26.55/";
const token = sessionStorage.getItem("token");

// Get All Posting
export const getAllListsDB = createAsyncThunk("GET/getAllLists", async () => {
  return await axios.get(`${BASE_URL}/room`).then((res) => res.data);
});

//✅slice가 여러개라도 store은 하나인 것을 명심하세요.

//createSlice()는 객체를 인자로 가지는데
//1. 슬라이스 이름 name
//2. 초기값 initialState
//3. reducers 리듀서들

//방(room) 생성

export const addRoom = createAsyncThunk("ADD/addRoom", async (formData) => {
  const res = await axios.post(`${BASE_URL}/api/room/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${token}`,
    },
  });
  return res.data;
});

//메인 room list 불러오기
export const getMainList = createAsyncThunk("GET/getRoom", async () => {
  return await axios
    .get(`${BASE_URL}api/room/rooms`)
    .then((res) => res.data)
    .catch((e) => console.log(e));
});

//카테고리별 리스트 가져오기
export const getRoomListByCategory = createAsyncThunk(
  "GET/getRoomListByCategory",
  async (clickedCategory) => {
    return await axios
      .get(`${BASE_URL}/api/room/tag/${clickedCategory}`)
      .then((res) => res.data.result.list)
      .catch((e) => console.log(e));
  }
);

// room 찜하기(좋아요) 기능
// 버튼 클릭 시 서버로 roomId 보내주기(클릭한 유저가 어떤 유저인지 토큰으로 확인가능?)
export const likedRoom = createAsyncThunk("POST/likedRoom", async (roomId) => {
  const res = await axios
    .post(
      `${BASE_URL}/api/room/like/${roomId}`,
      {},
      {
        headers: { Authorization: `${token}` },
      }
    )
    .then((res) => res.data);
  return res.data;
});

//pending - 아직 데이터 오는중, fullfilled 성공, rejected 실패
const roomSlice = createSlice({
  name: "room",
  initialState: {
    category: "전체",
    roomList: [],
    axiosState: "",
    modalState: false,
  },
  reducers: {},
  extraReducers: {
    [getMainList.pending]: (state, action) => {
      state.axiosState = "pending";
      console.log(state.axiosState); //pending
    },
    [getMainList.fulfilled]: (state, action) => {
      //axiosState를 fulfilled로 바꿔주고
      //roomList의 내용을 서버로부터 받아온 전체(메인)리스트로 설정해준다.
      state.axiosState = "fulfilled";
      state.roomList = [...action.payload.roomList];
    },
    [getMainList.rejected]: (state, action) => {
      state.axiosState = "rejected";
      console.log("list data loading failed");
    },
  },
});

//actions는 컴포넌트에서 불러올때 쓰인다.

//리듀서는 store로 불러와서 리듀서들끼리 뭉쳐놓을 때 쓰인다. => configureStore()에 꼭 들어가야하는게 (각 슬라이스의)리듀서라서 얘를 내보내준다.
export default roomSlice.reducer;
