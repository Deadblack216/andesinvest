import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  return (
    <div className="h-screen flex bg-gray-100">
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-10">
        {/* Left Section (Illustration and Security Tips) */}
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <img src="public/log.png" alt="Security Illustration" className="mx-auto mb-4 w-1/4"/>
            <h2 className="text-2xl font-bold text-indigo-900">Verifica en tu navegador que estás en Banca Web.</h2>
            <div className="flex justify-center items-center mt-4">
              <img src="public/login.webp" alt="Lock Icon" className="mr-2"/>
            </div>
          </div>
          <div className="text-left">
            <ol className="list-decimal list-inside text-gray-700">
              <li>Cuida tu usuario y contraseña.</li>
              <li>Antes de ingresar la Clave Digital verifica que los 4 últimos dígitos de tu cédula sean correctos.</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="flex-2 flex flex-col items-center justify-center bg-gray-50 p-16">
        {/* Right Section (Login Form) */}
        <div className="w-full max-w-lg p-12 bg-white rounded-lg shadow-lg">
          {loginErrors.map((error, i) => (
            <Message message={error} key={i} />
          ))}
          <h1 className="text-3xl font-bold text-indigo-900 mb-6">Inicia Sesión</h1>

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-black">Correo:</label>
              <input
                type="email"
                name="email"
                placeholder="tucorreo@epn.edu.ec"
                {...register("email")}
                className="mt-1 block w-full border border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-indigo-500 text-lg text-black py-3 px-4"
              />
              {errors.email?.message && (
                <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-black">Contraseña:</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                {...register("password")}
                className="mt-1 block w-full border border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-indigo-500 text-lg text-black py-3 px-4"
              />
              {errors.password?.message && (
                <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <Link to="/forgot-password" className="text-sm text-blue-500 hover:text-blue-400">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors">
              Ingresar
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            No tienes una cuenta? <Link to="/register" className="text-blue-500 hover:text-blue-400">Registrate</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        body {
          background-color: #FFF;
        }
      `}</style>
    </div>
  );
}
