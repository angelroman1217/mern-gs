import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { EmployeesProvider } from "./context/EmployeesContext";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeesFormPage from "./pages/EmployeesFormPage";
import HomePage from "./pages/HomePage";

import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <EmployeesProvider>
        <BrowserRouter>
          <main className="container mx-auto px-2">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/employees" element={<EmployeesPage />} />
                <Route path="/add-employees" element={<EmployeesFormPage />} />
                <Route path="/employees/:id" element={<EmployeesFormPage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </EmployeesProvider>
    </AuthProvider>
  );
}

export default App;
