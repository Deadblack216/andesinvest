import { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Message, Button, Input, Label } from '../components/ui';
import { useForm } from 'react-hook-form';
import { registerSchema } from '../schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

function RegisterPage() {
  const { errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    const userData = {
      username: value.username,
      email: value.email,
      password: value.password,
      confirmPassword: value.confirmPassword,
      fullName: value.fullName,
      dateOfBirth: value.dateOfBirth,
      phoneNumber: value.phoneNumber,
      address: value.address,
      cedula: value.cedula,
    };

    try {
      await axios.post('http://localhost:4000/send-verification-code', { email: userData.email });
      navigate('/verify-code', { state: { email: userData.email, userData, isRegister: true } });
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks');
  }, [isAuthenticated]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 bg-white p-10">
          {registerErrors.map((error, i) => (
            <Message message={error} key={i} />
          ))}
          <h1 className="text-3xl font-bold text-indigo-900 mb-4">Regístrate</h1>
          <p className="text-black mb-6">Para continuar, necesitamos que ingreses tu información para crear una cuenta.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-black">Nombre de Usuario:</label>
              <input
                type="text"
                name="username"
                placeholder="Escribe tu usuario"
                {...register("username")}
                autoFocus
                className="mt-1 block w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm text-black"
              />
              {errors.username?.message && (
                <p className="text-red-500 text-sm mt-1">{errors.username?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">Correo Electrónico:</label>
              <input
                type="email"
                name="email"
                placeholder="tucorreo@epn.edu.ec"
                {...register("email")}
                className="mt-1 block w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm text-black"
              />
              {errors.email?.message && (
                <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black">Contraseña:</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                {...register("password")}
                className="mt-1 block w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm text-black"
              />
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">La contraseña debe contener:</label>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">Al menos un carácter especial</label>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">Al menos una letra mayúscula</label>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">Al menos un número</label>
              {errors.password?.message && (
                <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">Confirmar Contraseña:</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="********"
                {...register("confirmPassword")}
                className="mt-1 block w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm text-black"
              />
              {errors.confirmPassword?.message && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-black">Nombre Completo:</label>
              <input
                type="text"
                name="fullName"
                placeholder="Nombre Completo"
                {...register("fullName")}
                className="mt-1 block w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm text-black"
              />
              {errors.fullName?.message && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-black">Fecha de Nacimiento:</label>
              <input
                type="date"
                name="dateOfBirth"
                {...register("dateOfBirth")}
                className="mt-1 block w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm text-black"
              />
              {errors.dateOfBirth?.message && (
                <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-black">Número de Teléfono:</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="+593991234567"
                {...register("phoneNumber")}
                className="mt-1 block w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm text-black"
              />
              {errors.phoneNumber?.message && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-black">Dirección:</label>
              <input
                type="text"
                name="address"
                placeholder="Dirección completa"
                {...register("address")}
                className="mt-1 block w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm text-black"
              />
              {errors.address?.message && (
                <p className="text-red-500 text-sm mt-1">{errors.address?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="cedula" className="block text-sm font-medium text-black">Número de Cédula:</label>
              <input
                type="text"
                name="cedula"
                placeholder="Número de cédula"
                {...register("cedula", {
                  maxLength: { value: 10, message: "Máximo 10 caracteres" },
                  pattern: { value: /^[0-9]*$/, message: "Solo números permitidos" },
                })}
                className="mt-1 block w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm text-black"
              />
              {errors.cedula?.message && (
                <p className="text-red-500 text-sm mt-1">{errors.cedula?.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors">
              Continuar
            </Button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            ¿Ya tienes una cuenta? <Link className="text-indigo-500 hover:text-indigo-400" to="/login">Iniciar Sesión</Link>
          </p>
        </div>
        {/* Right Section (Opcional, para validación de identidad) */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-indigo-200 p-10">
          <div className="text-center">
            <img src="public/id_card.svg" alt="Validation" className="w-24 h-24 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-indigo-900 mb-2">Valida tu identidad</h2>
            <p className="text-indigo-900">Para continuar, necesitamos que ingreses tu número de identificación y que llenes los campos necesarios.</p>
            <p className="mt-4 text-sm text-indigo-900">Ten en cuenta que los datos ingresados deben ser similares a los de la cédula de identidad</p>
          </div>
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

export default RegisterPage;
