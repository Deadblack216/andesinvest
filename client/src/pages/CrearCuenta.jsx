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
    <Card>
      <form className="formcuenta" onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Nombres</Label>
        <Input
          type="text"
          name="title"
          placeholder="Nombres"
          {...register("title", { required: "Por favor, ingrese un nombre." })}
          autoFocus
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
        ></Textarea>

        <Label htmlFor="date">Fecha de nacimiento</Label>
        <Input
          type="date"
          name="date"
          {...register("date", { required: "Por favor, seleccione una fecha." })}
        />
        {errors.date && (
          <p className="text-red-500 text-xs italic">{errors.date.message}</p>
        )}

        <Label>Tipo de cuenta</Label>
        <div>
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
  );
}

export default CrearCuenta;
