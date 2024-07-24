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
      accountNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      accountType: 'savings',
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 bg-white p-10">
          <Card className="w-full p-8 bg-gray-100 rounded-lg shadow-lg">
            {registerErrors.map((error, i) => (
              <Message message={error} key={i} />
            ))}
            <h1 className="text-3xl font-bold text-blue-900 mb-4">Regístrate</h1>
            <p className="text-gray-600 mb-6">Para continuar, necesitamos que ingreses tu información para crear una cuenta.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de Usuario:</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Escribe tu nombre"
                  {...register("username")}
                  autoFocus
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.username?.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.username?.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico:</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="tucorreo@epn.edu.ec"
                  {...register("email")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.email?.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="********"
                  {...register("password")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.password?.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña:</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="********"
                  {...register("confirmPassword")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.confirmPassword?.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nombre Completo:</Label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Nombre Completo"
                  {...register("fullName")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.fullName?.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName?.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento:</Label>
                <Input
                  type="date"
                  name="dateOfBirth"
                  {...register("dateOfBirth")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.dateOfBirth?.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth?.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Número de Teléfono:</Label>
                <Input
                  type="tel"
                  name="phoneNumber"
                  placeholder="+593991234567"
                  {...register("phoneNumber")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.phoneNumber?.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber?.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección:</Label>
                <Input
                  type="text"
                  name="address"
                  placeholder="Dirección completa"
                  {...register("address")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.address?.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.address?.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="cedula" className="block text-sm font-medium text-gray-700">Número de Cédula:</Label>
                <Input
                  type="text"
                  name="cedula"
                  placeholder="Número de cédula"
                  {...register("cedula", {
                    maxLength: { value: 10, message: "Máximo 10 caracteres" },
                    pattern: { value: /^[0-9]*$/, message: "Solo números permitidos" },
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.cedula?.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.cedula?.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-colors">
                Continuar
              </Button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              ¿Ya tienes una cuenta? <Link className="text-blue-500 hover:text-blue-400" to="/login">Iniciar Sesión</Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
