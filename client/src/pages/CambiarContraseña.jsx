import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Label } from '../components/ui';

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
                    <Label htmlFor="currentPassword">Ingresa la contraseña actual</Label>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            id="currentPassword"
                            {...register("currentPassword", { required: "Por favor, ingrese su contraseña actual." })}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 text-sm text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                    {errors.currentPassword && <p className="text-red-500 text-xs italic">{errors.currentPassword.message}</p>}
                </div>
                <div className="mb-4">
                    <Label htmlFor="newPassword">Ingresa la contraseña nueva</Label>
                    <div className="relative">
                        <Input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            {...register("newPassword", {
                                required: "Por favor, ingrese una nueva contraseña.",
                                minLength: {
                                    value: 6,
                                    message: "La nueva contraseña debe tener al menos 6 caracteres."
                                }
                            })}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 text-sm text-gray-700"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                    {errors.newPassword && <p className="text-red-500 text-xs italic">{errors.newPassword.message}</p>}
                </div>
                <div className="mb-4">
                    <Label htmlFor="confirmNewPassword">Confirme la nueva contraseña</Label>
                    <div className="relative">
                        <Input
                            type={showConfirmNewPassword ? "text" : "password"}
                            id="confirmNewPassword"
                            {...register("confirmNewPassword", {
                                required: "Por favor, confirme su nueva contraseña.",
                                validate: value => value === newPassword || "Las contraseñas no coinciden."
                            })}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 text-sm text-gray-700"
                            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        >
                            {showConfirmNewPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                    {errors.confirmNewPassword && <p className="text-red-500 text-xs italic">{errors.confirmNewPassword.message}</p>}
                </div>
                <Button type="submit">Guardar cambios</Button>
            </form>
        </div>
    );
};

export default CambiarContraseña;
