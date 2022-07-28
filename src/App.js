import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Main from "./pages/Main";
// import Mypage from "./pages/Mypage";
import styled from "styled-components";
import "./App.css";
import "./shared/font/pretendard.css";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/Mypage";
import Modify from "./pages/Modify";
import VideoPage from "./pages/VideoPage";
import Kakaologin from "./pages/Kakaologin";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <div className="App">
      <StyledApp>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/mypage" element={<MyPage />}></Route>
            <Route path="/search" element={<SearchPage />}></Route>
            <Route path="Modify" element={<Modify />}></Route>
            <Route path="/Kakaologin" element={<Kakaologin />}></Route>
            <Route path="/public-room/:roomId" element={<VideoPage />}></Route>
          </Routes>
        </Router>
      </StyledApp>
    </div>
  );
}

const StyledApp = styled.div`
  width: 100%;
  margin: 0 auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default App;
