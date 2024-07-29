import { z } from "zod" ;

const requiredString = z.string().trim().min(1, "Required")

export const signUpSchema = z.object({
    email: requiredString.email("Invalid Email Address"),
    username: requiredString.regex(
        /^[a-zA-Z0-9_-]+$/,
        "Only Letters, Numbers, - and _ Allowed"
    ),
    password: requiredString.min(8, "Must be atleast 8 characters")
});

export type signUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
    username: requiredString,
    password: requiredString
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
    content: requiredString,
  });