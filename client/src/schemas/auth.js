import { z } from "zod";

export const addressSchema = z.string().min(5, {
  message: "Address must be at least 5 characters",
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const registerSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }).refine((email) => email.endsWith("@epn.edu.ec"), {
      message: "Email must end with @epn.edu.ec",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
    fullName: z.string().min(2, {
      message: "Full name is required",
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
      message: "You must be at least 18 years old",
    }),
    phoneNumber: z.string().min(10, {
      message: "Phone number is required",
    }),
    address: addressSchema,
    cedula: z.string().max(10, {
      message: "Cédula must have a maximum of 10 characters",
    }).regex(/^[0-9]*$/, {
      message: "Only numbers are allowed for Cédula",
    }),
  });
