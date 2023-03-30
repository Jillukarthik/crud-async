import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPost from "./UserPost/UserPost";
import CreatePost from "./UserPost/Create";

function App() {
  return (
    <div className="App">
      <h1>CRUD RKT</h1>
      <Router>
        <Routes>
          <Route path="/" element={<UserPost/>} />
          <Route path="/create" element={<CreatePost/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
