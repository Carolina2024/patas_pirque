import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Navbar from "./layout/NavBar";
import PublicLayout from "./componentes/PublicLayout";

function App() {
  return (
    <Router>
      <Navbar />
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
