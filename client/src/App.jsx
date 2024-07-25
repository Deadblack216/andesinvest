// /src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { LoginPage } from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerifyCodePage from './pages/VerifyCodePage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import RegisterSuccessPage from './pages/RegisterSuccessPage';
import { TaskProvider } from "./context/tasksContext";
import { AccountProvider } from "./context/accountContext"; // Importa el nuevo proveedor de contexto
import { TransferProvider } from "./context/transferContext";
import CanalesDigitales from "./pages/CanalesDigitales";
import Transferencias from "./pages/Transferencias";
import CrearCuenta from "./pages/CrearCuenta";
import CambiarContraseña from "./pages/CambiarContraseña";
import Saldos from "./pages/Saldos";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AccountProvider>
          <TransferProvider>
          <BrowserRouter>
            <main className="container content-container mx-auto px-10 md:px-0">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/verify-code" element={<VerifyCodePage />} />
                <Route path="/register-success" element={<RegisterSuccessPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/add-task" element={<TaskFormPage />} />
                  <Route path="/tasks/:id" element={<TaskFormPage />} />
                  <Route path="/profile" element={<h1>Profile</h1>} />
                  <Route path="/cambiarcontra" element={<CambiarContraseña />} />
                </Route>
                <Route path="/canales-digitales" element={<CanalesDigitales />} />
                <Route path="/transferencias" element={<Transferencias />} />
                <Route path="/crearcuenta" element={<CrearCuenta />} />
                <Route path="/saldo" element={<Saldos  />} />
                
              </Routes>
            </main>
          </BrowserRouter>
          </TransferProvider>
        </AccountProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
