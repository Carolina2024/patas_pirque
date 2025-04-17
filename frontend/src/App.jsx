import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./Components/PublicLayout";
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
