import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UserList from "./components/UserList"
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

   <div>
      <h1>hello</h1>
      <UserList />
    </div>
    </Router>
  );
}

export default App;

