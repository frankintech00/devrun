import React from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <h1>App</h1>
      <SignUp />;
      <SignIn />;
    </AuthProvider>
  );
}

export default App;
