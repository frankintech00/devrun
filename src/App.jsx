import React from "react";
import SignUp from "./pages/signUp";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <SignUp />;
    </AuthProvider>
  );
}

export default App;
