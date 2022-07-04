import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import VideoChat from "./pages/VideoChat";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/video" element={<VideoChat />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
