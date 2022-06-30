import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main"



function App() {
  return (
    <div className="App">
      <Router>
             <Routes>
            <Route path="/" element={<Main/>}></Route> 
            </Routes>
         </Router>
    </div>
  );
}

export default App;
