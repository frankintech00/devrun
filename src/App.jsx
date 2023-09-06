import React from "react";
import SignIn from "./pages/auth/SignIn";

import SignUp from "./pages/auth/SignUp";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <SignIn />
      <SignUp />
    </AuthProvider>
  );
}

export default App;
