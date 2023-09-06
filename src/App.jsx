import React from "react";
import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
import Test from "./pages/Test";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <h1>App</h1>
      <Test />
      {/* <SignUp /> */}
      <SignIn />
    </AuthProvider>
  );
}

export default App;
