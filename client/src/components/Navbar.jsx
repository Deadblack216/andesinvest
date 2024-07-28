import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import { useState } from "react";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-800 w-full my-3 flex justify-between py-5 px-10 rounded-lg relative z-50">
      <div className="flex items-center space-x-4">
        <img src="public/image.png" alt="Logo" className="h-12 w-13 rounded-lg shadow-lg" />
        <h1 className="text-2xl font-bold text-white">
          <Link to={isAuthenticated ? "/tasks" : "/"}>AndesInvest</Link>
        </h1>
      </div>
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <ul className={`md:flex md:flex-wrap gap-x-10 text-white text-lg ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
        {isAuthenticated ? (
          <>
            <li
              className="relative"
              onMouseEnter={() => setIsAccountMenuOpen(true)}
              onMouseLeave={() => setIsAccountMenuOpen(false)}
            >
              <span className="hover:bg-blue-700 px-3 py-1 rounded cursor-pointer">Servicios bancarios</span>
              {isAccountMenuOpen && (
                <ul
                  className="absolute left-0 bg-white text-black mt-1 py-2 w-48 shadow-lg rounded-lg z-50"
                  onMouseEnter={() => setIsAccountMenuOpen(true)}
                  onMouseLeave={() => setIsAccountMenuOpen(false)}
                >
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/saldo">Saldo</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/transferencias">Transferencias</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/paypal">Paypal</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/crearcuenta">Crear cuenta</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/transacciones">Transacciones</Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="relative"
              onMouseEnter={() => setIsServicesMenuOpen(true)}
              onMouseLeave={() => setIsServicesMenuOpen(false)}
            >
              <span className="hover:bg-blue-700 px-3 py-1 rounded cursor-pointer">Pagos y recargas</span>
              {isServicesMenuOpen && (
                <ul
                  className="absolute left-0 bg-white text-black mt-1 py-2 w-48 shadow-lg rounded-lg z-50"
                  onMouseEnter={() => setIsServicesMenuOpen(true)}
                  onMouseLeave={() => setIsServicesMenuOpen(false)}
                >
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/service-bills">Pago de servicios básicos</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/recargas-moviles">Recargas móviles</Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="relative"
              onMouseEnter={() => setIsProfileMenuOpen(true)}
              onMouseLeave={() => setIsProfileMenuOpen(false)}
            >
              <span className="hover:bg-blue-700 px-3 py-1 rounded cursor-pointer">Perfil</span>
              {isProfileMenuOpen && (
                <ul
                  className="absolute left-0 bg-white text-black mt-1 py-2 w-48 shadow-lg rounded-lg z-50"
                  onMouseEnter={() => setIsProfileMenuOpen(true)}
                  onMouseLeave={() => setIsProfileMenuOpen(false)}
                >
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/DatosPersonales">Datos personales</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/configuracion-cuenta">Configuración de la cuenta</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/cambiarcontra">Cambiar Contraseña</Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="relative"
              onMouseEnter={() => setIsHelpMenuOpen(true)}
              onMouseLeave={() => setIsHelpMenuOpen(false)}
            >
              <span className="hover:bg-blue-700 px-3 py-1 rounded cursor-pointer">Centro de Ayuda</span>
              {isHelpMenuOpen && (
                <ul
                  className="absolute left-0 bg-white text-black mt-1 py-2 w-48 shadow-lg rounded-lg z-50"
                  onMouseEnter={() => setIsHelpMenuOpen(true)}
                  onMouseLeave={() => setIsHelpMenuOpen(false)}
                >
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/Chat">Chat en Vivo</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/enviar-correo">Envíanos un correo</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/canales-digitales">Canales Digitales</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/" onClick={() => logout()} className="hover:bg-red-700 bg-red-600 px-3 py-1 rounded">
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">Ingresar</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Registrarse</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
