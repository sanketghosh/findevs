import { z } from "zod";

// sign up schema
export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: "Username of at least four characters needed.",
      })
      .max(12, {
        message: "Maximum twelve characters acceptable.",
      }),
    email: z.email({
      message: "A valid email is required",
    }),
    password: z.string().min(9, {
      message: "At least 0 characters needed.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password did not match",
    path: ["confirmPassword"],
  });

// sign in schema
export const SignInSchema = z.object({
  email: z.string().email({
    message: "Not a valid email address.",
  }),
  password: z.string().min(9, {
    message: "Must be of at least 9 characters.",
  }),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type SignInSchemaType = z.infer<typeof SignInSchema>;
