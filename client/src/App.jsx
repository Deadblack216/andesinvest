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
import { AccountProvider } from "./context/accountContext";
import { TransferProvider } from "./context/transferContext";
import { ServiceBillProvider } from "./context/serviceBillContext"; // Importa el ServiceBillProvider
import { TransactionProvider } from "./context/transactionContext"; // Importa el TransactionProvider
import CanalesDigitales from "./pages/CanalesDigitales";
import Transferencias from "./pages/Transferencias";
import CrearCuenta from "./pages/CrearCuenta";
import CambiarContraseña from "./pages/CambiarContraseña";
import Saldos from "./pages/Saldos";
import Transacciones from "./pages/Transacciones";
import DatosPersonales from "./pages/DatosPersonales";
import EnviarCorreo from "./pages/EnviarCorreo"; // Importa el nuevo componente
import ServiceBillComponent from "./pages/ServiceBillPage"; // Importa el componente de facturas de servicios
import PaypalSuccess from './pages/PaypalSuccess'; // Importa la página de éxito de PayPal

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AccountProvider>
          <TransferProvider>
            <TransactionProvider> {/* Añade el TransactionProvider */}
              <ServiceBillProvider> {/* Añade el ServiceBillProvider */}
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
                      <Route path="/enviar-correo" element={<EnviarCorreo />} />
                      <Route path="/service-bills" element={<ServiceBillComponent />} /> {/* Añade la ruta de facturas */}
                      <Route path="/service-bills/paypal/success" element={<PaypalSuccess />} /> {/* Añade la nueva ruta */}
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
                      <Route path="/saldo" element={<Saldos />} />
                      <Route path="/transacciones" element={<Transacciones />} />
                      <Route path="/datospersonales" element={<DatosPersonales />} />
                    </Routes>
                  </main>
                </BrowserRouter>
              </ServiceBillProvider>
            </TransactionProvider>
          </TransferProvider>
        </AccountProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
