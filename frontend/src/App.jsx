import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogIn";
import DashBoard from "./Components/DashBoard";
import PrivateRoute from "./Components/PrivateRoute"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
