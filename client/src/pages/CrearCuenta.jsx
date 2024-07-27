// /src/pages/CrearCuenta.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Input, Label } from "../components/ui";
import { Textarea } from "../components/ui/Textarea";
import { useAccount } from "../context/accountContext";
import { useNavigate } from "react-router-dom";

function CrearCuenta() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createAccount } = useAccount();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await createAccount(data);
      navigate("/saldo");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-wrapper">
      <Card className="custom-card">
        <form className="formcuenta" onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="title">Nombres</Label>
          <Input
            type="text"
            name="title"
            placeholder="Nombres"
            {...register("title", { required: "Por favor, ingrese un nombre." })}
            autoFocus
            className="input-color"
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">{errors.title.message}</p>
          )}

          <Label htmlFor="lastName">Apellidos</Label>
          <Input
            type="text"
            name="lastName"
            placeholder="Apellidos"
            {...register("lastName", { required: "Por favor, ingrese un apellido." })}
            className="input-color"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>
          )}

          <Label htmlFor="cedula">Cedula</Label>
          <Input
            type="number"
            name="cedula"
            placeholder="Cedula"
            {...register("cedula", {
              required: "Por favor, ingrese una cédula válida.",
              maxLength: {
                value: 10,
                message: "La cédula no puede tener más de 10 números.",
              },
            })}
            className="input-color"
          />
          {errors.cedula && (
            <p className="text-red-500 text-xs italic">{errors.cedula.message}</p>
          )}

          <Label htmlFor="description">Direccion</Label>
          <Textarea
            name="description"
            id="description"
            rows="3"
            placeholder="Direccion"
            {...register("description")}
            className="input-color"
          ></Textarea>

          <Label htmlFor="date">Fecha de nacimiento</Label>
          <Input
            type="date"
            name="date"
            {...register("date", { required: "Por favor, seleccione una fecha." })}
            className="input-color"
          />
          {errors.date && (
            <p className="text-red-500 text-xs italic">{errors.date.message}</p>
          )}

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
        .input-color {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border: 2px solid #1E3A8A; /* Azul oscuro */
          border-radius: 4px;
          background-color: #E0F7FA; /* Fondo celeste */
          color: #00BFFF; /* Texto celeste claro */
          font-size: 14px;
          transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;
        }
        .input-color::placeholder {
          color: #00BFFF; /* Color del placeholder celeste claro */
        }
        .input-color:focus {
          border-color: #60a5fa; /* Azul claro al enfocar */
          background-color: #BEE3F8; /* Fondo azul claro */
          outline: none;
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

