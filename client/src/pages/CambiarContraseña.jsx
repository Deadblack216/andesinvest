import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const CambiarContraseña = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const newPassword = watch("newPassword", "");

    const onSubmit = data => {
        console.log(data);
        // Aquí realizarías la petición para cambiar la contraseña
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Cambiar contraseña</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="currentPassword" className="block text-gray-700 font-bold mb-2">Ingresa la contraseña actual</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="currentPassword"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...register("currentPassword", { required: "Por favor, ingrese su contraseña actual." })}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 py-1 text-sm text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                    {errors.currentPassword && <p className="text-red-500 text-xs italic">{errors.currentPassword.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">Ingresa la contraseña nueva</label>
                    <div className="relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                            className="absolute inset-y-0 right-0 px-3 py-1 text-sm text-gray-700"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                    {errors.newPassword && <p className="text-red-500 text-xs italic">{errors.newPassword.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmNewPassword" className="block text-gray-700 font-bold mb-2">Confirme la nueva contraseña</label>
                    <div className="relative">
                        <input
                            type={showConfirmNewPassword ? "text" : "password"}
                            id="confirmNewPassword"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...register("confirmNewPassword", {
                                required: "Por favor, confirme su nueva contraseña.",
                                validate: value => value === newPassword || "Las contraseñas no coinciden."
                            })}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 py-1 text-sm text-gray-700"
                            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        >
                            {showConfirmNewPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                    {errors.confirmNewPassword && <p className="text-red-500 text-xs italic">{errors.confirmNewPassword.message}</p>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Guardar cambios
                </button>
            </form>
        </div>
    );
};

export default CambiarContraseña;
