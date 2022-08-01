import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Main from "./pages/Main";
// import Mypage from "./pages/Mypage";
import styled from "styled-components";
import GlobalStyle from "./shared/font/GlobalStyle";
import "./App.css";

import "./shared/font/pretendard.css";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/Mypage";
import Modify from "./pages/Modify";
import VideoPage from "./pages/VideoPage";
import Kakaologin from "./pages/Kakaologin";
import SearchPage from "./pages/SearchPage";
import IntroPage from "./pages/IntroPage";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <StyledApp>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/IntroPage" element={<IntroPage />}></Route>
            <Route path="/mypage" element={<MyPage />}></Route>
            <Route path="/search" element={<SearchPage />}></Route>
            <Route path="/Modify" element={<Modify />}></Route>
            <Route path="/kakaotalk" element={<Kakaologin />}></Route>
            <Route path="/public-room/:roomId" element={<VideoPage />}></Route>
          </Routes>
        </Router>
      </StyledApp>
    </div>
  );
}

const StyledApp = styled.div`
  width: 100%;
  /* min-width: 1920px; 혹은 1440*/
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default App;
