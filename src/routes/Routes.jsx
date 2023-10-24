import { Route, Routes as Router } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute.jsx";

import HomePage from "../pages/HomePage.jsx";
import SignUpUser from "../pages/auth/SignUpUser.jsx";
import UserProfile from "../pages/auth/UserProfile.jsx";

function AppRoutes() {
  return (
    <Router>
      <Route path="/" element={<SignUpUser />} />
      <Route path="/signup" element={<SignUpUser />} />
      <Route
        path="/userprofile/:id"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
    </Router>
  );
}

export default AppRoutes;
