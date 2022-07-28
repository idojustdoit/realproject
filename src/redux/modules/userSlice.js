import { createSlice } from "@reduxjs/toolkit";

//✅slice가 여러개라도 store은 하나인 것을 명심하세요.

//createSlice()는 객체를 인자로 가지는데
//1. 슬라이스 이름 name
//2. 초기값 initialState
//3. reducers 리듀서들

//유저 슬라이스 초기값
//로그인상태, 닉네임, 호스트 아이디, 이메일
const userSlice = createSlice({
  name: "authentication",
  initialState: {
    isLogin: false,
    nickName: "",
    hostId: -1,
    email: "",
  },
  reducers: {
    logOut(state, action) {
      state.isLogin = false;
    },
    logIn(state, action) {
      state.isLogin = true;
    },
    setHostId(state, action) {
      if (state.isLogin === true) {
        state.hostId = action.payload;
      }
    },
  },
});
//내보내진(export된) actions은 사용되는 컴포넌트에서 불러와서 쓰임
// e.g.)dispatch(authActions.logout()); 이런식으로 쓰임!
export const { changeLoginState, logIn, logOut } = userSlice.actions;
//auth 리듀서는 store로 불러와서 리듀서들끼리 뭉쳐놓을 때 쓰인다.
export default userSlice.reducer;
