import { Dashboard } from "./pages/Dashboard";
import './App.css'
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { Brain } from "./pages/Brain";
import { HashProvider } from "./hooks/useHash";

function App() {
  return (
    <AuthProvider>
      <HashProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Signin />} />
            <Route path="/brain/*" element={<Brain />} />
          </Routes>
        </BrowserRouter>
      </HashProvider>
    </AuthProvider>
  )
}

export default App
