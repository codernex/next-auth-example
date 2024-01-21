import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is required",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required"),
});

export const registerSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is required",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Minimum 6 characters required"),

  name: z.string().min(1, "Name is required"),
});
