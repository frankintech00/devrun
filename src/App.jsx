import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import AppRoutes from "./routes/Routes.jsx";

function App() {
  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
