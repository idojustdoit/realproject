import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Main from "./pages/Main";
// import Mypage from "./pages/Mypage";
import styled from "styled-components";
import "./App.css";
import "./shared/font/pretendard.css";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/Mypage";
import Modify from "./pages/Modify";
import VideoChat from "./pages/VideoChat";

function App() {
  return (
    <div className="App">
      <StyledApp>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/mypage" element={<MyPage />}></Route>
            <Route path="Modify" element={<Modify />}></Route>
            <Route path="/video" element={<VideoChat />}></Route>
            <Route path="/video/:roomId" element={<VideoChat />}></Route>
          </Routes>
        </Router>
      </StyledApp>
    </div>
  );
}

const StyledApp = styled.div`
  /* width: 1920px; */
  /* width: 100%; */
  margin: 0 auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: mintcream;
`;

export default App;
