import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const USER_ID = localStorage.getItem("userId");
const API_URL = process.env.REACT_APP_API_URL;
const TOKEN = localStorage.getItem("accessToken");

//마이페이지 정보 가져오기(안 씀)
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
      .then((res) => res.data)
      .catch((e) => console.log(e));
  }
);

//isLoading true- 로딩중이다. false -로딩끝! 데이터 가져왔음or 실패함
const myRoomSlice = createSlice({
  name: "myRoom",
  initialState: {
    myPageInfo: [],
    attendRooms: [],
    hostRooms: [],
    likeRooms: [],
    attendRoomsLength: 0,
    hostRoomsLength: 0,
    likeRoomsLength: 0,
    isLoading: "",
  },
  reducers: {
    deleteARoom(state, { payload }) {
      //호스팅중인 방의 수와 방 둘다 업데이트되어야 한다.
      const new_list = current(state.hostRooms).filter((room) => {
        return room.roomId !== payload;
      });
      state.hostRooms = [...new_list];
      state.hostRoomsLength = new_list.length;
    },
  },

  extraReducers: {
    [getMypageInfos.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getMypageInfos.fulfilled]: (state, action) => {
      state.myPageInfo = action.payload.myPage;
      state.attendRooms = [...action.payload.attendInfo];
      state.hostRooms = [...action.payload.hostInfo];
      state.likeRooms = [...action.payload.likeInfo];
      state.hostRoomsLength = action.payload.hostInfoLength;
      state.attendRoomsLength = action.payload.attendInfoLength;
      state.likeRoomsLength = action.payload.likeInfoLength;
      state.isLoading = false;
    },
    [getMypageInfos.rejected]: (state, action) => {
      window.alert("마이페이지 리스트 불러오기를 실패하였습니다.");
      state.isLoading = false;
    },
  },
});

//actions는 컴포넌트에서 불러올때 쓰인다.
export const { deleteARoom } = myRoomSlice.actions;
//리듀서는 store로 불러와서 리듀서들끼리 뭉쳐놓을 때 쓰인다. => configureStore()에 꼭 들어가야하는게 (각 슬라이스의)리듀서라서 얘를 내보내준다.
export default myRoomSlice.reducer;
