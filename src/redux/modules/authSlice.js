import { createSlice } from "@reduxjs/toolkit";

//얘는 로그인 시 헤더의 모습이 바뀌는 거에 사용하면 좋을 거 같아요
//
const initialAuthState = { isAuth: false };
//✅slice가 여러개라도 store은 하나인 것을 명심하세요.

//createSlice()는 객체를 인자로 가지는데
//1. 슬라이스 이름 name
//2. 초기값 initialState
//3. reducers 리듀서들
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});
//내보내진(export된) actions은 사용되는 컴포넌트에서 불러와서 쓰임
// e.g.)dispatch(authActions.logout()); 이런식으로 쓰임!
export const authActions = authSlice.actions;
//auth 리듀서는 store로 불러와서 리듀서들끼리 뭉쳐놓을 때 쓰인다.
export default authSlice.reducer;
