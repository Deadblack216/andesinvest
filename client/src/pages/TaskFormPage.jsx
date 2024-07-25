import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

      navigate("/tasks");
    } catch (error) {
      console.log(error);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("lastName", task.lastName);
        setValue("cedula", task.cedula);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);
        setValue("accountType", task.accountType);
      }
    };
    loadTask();
  }, []);

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
              value: 9,
              message: "La cédula no puede tener más de 9 números.",
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
              value="ahorro"
              {...register("accountType", { required: "Por favor, seleccione un tipo de cuenta." })}
            />
            Ahorro
          </label>
          <label>
            <input
              type="radio"
              name="accountType"
              value="corriente"
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
