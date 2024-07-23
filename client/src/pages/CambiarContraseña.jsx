import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const CambiarContraseña = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const newPassword = watch("newPassword", "");

    const obtenerUserId = () => {
        return user?.id || "";
    };

    const onSubmit = async (data) => {
        try {
            const userId = obtenerUserId();
            const response = await axios.post('http://localhost:4000/change-password', {
                userId,
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            setSuccessMessage('Contraseña actualizada con éxito. Cerrando sesión...');
            setErrorMessage('');
            
            // Esperar un poco antes de cerrar la sesión para que el usuario pueda ver el mensaje de éxito
            setTimeout(() => {
                logout(); // Cerrar sesión
                navigate('/'); // Redirigir al usuario a la página principal
            }, 2000);
        } catch (error) {
            console.error(error);
            setErrorMessage('Contraseña actual incorrecta. Reintentar.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-gray-900 p-10 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-white">Cambiar contraseña</h1>
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{errorMessage}</span>
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <label htmlFor="currentPassword" className="block text-gray-300 font-bold mb-2 text-lg">Ingresa la contraseña actual</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="currentPassword"
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:shadow-outline text-lg"
                            {...register("currentPassword", { required: "Por favor, ingrese su contraseña actual." })}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 py-1 text-lg text-gray-300"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size="lg" />
                        </button>
                    </div>
                    {errors.currentPassword && <p className="text-red-500 text-sm italic mt-2">{errors.currentPassword.message}</p>}
                </div>
                <div className="mb-6">
                    <label htmlFor="newPassword" className="block text-gray-300 font-bold mb-2 text-lg">Ingresa la contraseña nueva</label>
                    <div className="relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:shadow-outline text-lg"
                            {...register("newPassword", {
                                required: "Por favor, ingrese una nueva contraseña.",
                                minLength: {
                                    value: 4,
                                    message: "La nueva contraseña debe tener al menos 4 caracteres."
                                }
                            })}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 py-1 text-lg text-gray-300"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} size="lg" />
                        </button>
                    </div>
                    {errors.newPassword && <p className="text-red-500 text-sm italic mt-2">{errors.newPassword.message}</p>}
                </div>
                <div className="mb-6">
                    <label htmlFor="confirmNewPassword" className="block text-gray-300 font-bold mb-2 text-lg">Confirme la nueva contraseña</label>
                    <div className="relative">
                        <input
                            type={showConfirmNewPassword ? "text" : "password"}
                            id="confirmNewPassword"
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:shadow-outline text-lg"
                            {...register("confirmNewPassword", {
                                required: "Por favor, confirme su nueva contraseña.",
                                validate: value => value === newPassword || "Las contraseñas no coinciden."
                            })}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 py-1 text-lg text-gray-300"
                            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        >
                            <FontAwesomeIcon icon={showConfirmNewPassword ? faEye : faEyeSlash} size="lg" />
                        </button>
                    </div>
                    {errors.confirmNewPassword && <p className="text-red-500 text-sm italic mt-2">{errors.confirmNewPassword.message}</p>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full text-lg"
                >
                    Guardar cambios
                </button>
            </form>
        </div>
    );
};

export default CambiarContraseña;
