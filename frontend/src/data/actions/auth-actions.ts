"use server"
import { z } from "zod";

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
  console.log("Hello From Register User Action");

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

 return {
    ...prevState,
    data: "Ok"
 }
}
