// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FridgePage from "./pages/FridgePage";
import FriendsPage from "./pages/FriendsPage"; // Ensure correct import
import RegisterPage from "./pages/RegisterPage"; // Ensure correct import
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/fridge"
            element={
              <ProtectedRoute>
                <FridgePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/friends"
            element={
              <ProtectedRoute>
                <FriendsPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <FridgePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
