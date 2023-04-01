import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Component/Login";
import Home from "./Component/Home";
import SearchData from './Component/Search'
import SearchAlgo from "./Component/SearchAlgo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/searchproduct" element={<SearchData />} />
        <Route path="/searchproduct2" element={<SearchAlgo />} />
      </Routes>
    </div>
  );
}

export default App;
