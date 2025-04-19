import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Pets from "./views/Pets";
import Navbar from "./layout/NavBar";
import PublicLayout from "./componentes/PublicLayout";
import NotFound from "./views/NotFound";
import Dashboard from "./views/Dashboard";
import PrivateRoute from "./componentes/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pets" element={<Pets />} />
          {/* Ruta del Dashboard protegida*/}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
