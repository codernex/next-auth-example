"use server";

import { db } from "@/lib/db";
import { errMessage, wait } from "@/lib/utils";
import { loginSchema, registerSchema } from "@/schemas";
import { z } from "zod";
import * as bcrypt from "bcryptjs";

export const login = async (
  data: z.infer<typeof loginSchema>
): Promise<{
  error?: string;
  success?: string;
}> => {
  const validateFields = loginSchema.safeParse(data);

  await wait(1000);

  if (!validateFields.success) {
    return {
      error: "Invalid Fileds",
    };
  }
  return {
    success: "Email sent    ",
  };
};

export const register = async (data: z.infer<typeof registerSchema>) => {
  try {
    const validateFields = loginSchema.safeParse(data);

    if (!validateFields.success) {
      return {
        error: "Invalid Fileds",
      };
    }

    const user = await db.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, 10),
      },
    });
    // Todo : send verification email

    return {
      success: `Email sent to ${user.email}`,
    };
  } catch (err: any) {
    return {
      error: errMessage(err),
    };
  }
};
