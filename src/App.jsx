import React from "react";
import SignIn from "./pages/SignIn";
import Test from "./pages/Test";
import SignUp from "./pages/SignUp";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <h1>App</h1>
      <Test />
      <SignIn />
      <SignUp />
    </AuthProvider>
  );
}

export default App;
