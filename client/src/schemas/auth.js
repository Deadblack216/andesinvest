import { z } from "zod";

export const addressSchema = z.string().min(5, {
  message: "La dirección debe tener al menos 5 caracteres",
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Por favor, introduce una dirección de correo electrónico válida",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});

export const registerSchema = z
  .object({
    username: z.string().min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    }),
    email: z.string().email({
      message: "Por favor, introduce una dirección de correo electrónico válida",
    }),
    password: z.string().min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    })
      .regex(/[A-Z]/, {
        message: "La contraseña debe contener al menos una letra mayúscula",
      })
      .regex(/[0-9]/, {
        message: "La contraseña debe contener al menos un número",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "La contraseña debe contener al menos un carácter especial",
      }),
    confirmPassword: z.string().min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    }),
    fullName: z.string().min(2, {
      message: "El nombre completo es obligatorio",
    }),
    dateOfBirth: z.string().refine((value) => {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }, {
      message: "Debes tener al menos 18 años",
    }),
    phoneNumber: z.string().min(10, {
      message: "El número de teléfono es obligatorio",
    }),
    address: addressSchema,
    cedula: z.string().max(10, {
      message: "La cédula debe tener un máximo de 10 caracteres",
    }).regex(/^[0-9]*$/, {
      message: "Solo se permiten números para la cédula",
    }),
  });
