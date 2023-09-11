import React from "react";
import SignUpUser from "./pages/auth/SignUpUser.jsx";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <SignUpUser />
    </AuthProvider>
  );
}

export default App;
