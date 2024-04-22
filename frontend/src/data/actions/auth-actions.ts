"use server"

import { ZodError, z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { registerUserService } from "@/data/services/auth-services";
import { StrapiErrors } from "@/components/ui/custom/StrapiErrors";

const config = {
  maxAge: 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
}

const schemaRegister = z.object({
    username: z.string().min(3).max(20, {
        message: "Username must be between 3 and 20 characters",
    }),
  password: z.string().min(8).max(100, {
    message: "Password must be between 8 and 100 characters",
  }),
    email: z.string().email({
        message: "Please enter a valid email address    ",
    }),
});

export async function registerUserAction(prevState: any, formData: FormData) {

  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fieds. Failed to register user",
    };
  
  }

  const responseData = await registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again",
    };
  }
if (responseData.error) {
  return {
    ...prevState,
    strapiErrors: responseData.error,
    zodErrors: null,
    message: "Failed to register user",
  };
}

cookies().set("jwt", responseData.jwt, config);
redirect("/dashboard");
}
