import React from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Label } from "../components/ui";
import { useAccount } from "../context/accountContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext"; // Asegurarnos de tener acceso al contexto de autenticación

function CrearCuenta() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createAccount } = useAccount();
  const { user } = useAuth(); // Obtener información del usuario autenticado
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await createAccount({ ...data, userId: user.id }); // Pasar el userId
      navigate("/saldo");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-wrapper">
      <Card className="custom-card">
        <form className="formcuenta" onSubmit={handleSubmit(onSubmit)}>
          <Label>Tipo de cuenta</Label>
          <div className="radio-color">
            <label>
              <input
                type="radio"
                name="accountType"
                value="savings"
                {...register("accountType", { required: "Por favor, seleccione un tipo de cuenta." })}
              />
              Ahorro
            </label>
            <label>
              <input
                type="radio"
                name="accountType"
                value="checking"
                {...register("accountType", { required: "Por favor, seleccione un tipo de cuenta." })}
              />
              Corriente
            </label>
          </div>
          {errors.accountType && (
            <p className="text-red-500 text-xs italic">{errors.accountType.message}</p>
          )}

          <Button>Guardar</Button>
        </form>
      </Card>
      <style jsx>{`
        body {
          background-color: #f0f4f8; /* Fondo claro */
          margin: 0;
        }
        .form-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: calc(100vh - 50px); /* Ajusta según la altura de tu barra de navegación */
        }
        .custom-card {
          border: 2px solid #1E3A8A; /* Azul oscuro */
        }
        .formcuenta {
          background-color: #ffffff; /* Fondo blanco */
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .formcuenta label {
          color: #333333; /* Texto oscuro pero no negro */
          font-weight: bold;
        }
        .radio-color label {
          color: #4a4a4a;
        }
        .formcuenta button {
          background-color: #60a5fa; /* Azul claro */
          color: #ffffff;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .formcuenta button:hover {
          background-color: #3b82f6; /* Azul un poco más oscuro al pasar el ratón */
        }
        .formcuenta p.text-red-500 {
          color: #ef4444; /* Rojo claro */
        }
        .formcuenta label {
          display: block;
          margin-bottom: 5px;
        }
        .formcuenta input[type="radio"] {
          margin-right: 10px;
        }
        .formcuenta div {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}

export default CrearCuenta;
