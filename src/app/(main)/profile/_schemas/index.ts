import { z } from "zod";

// --- FOR CHANGING NAME ---
export const UpdateNameSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Username of at least four characters needed.",
    })
    .max(12, {
      message: "Maximum twelve characters acceptable.",
    }),
});

// --- FOR CHANGING EMAIL
export const UpdateEmailSchema = z.object({
  email: z.email({
    message: "A valid email is required",
  }),
});

// --- FOR CHANGING THE PASSWORD OF USER ---
export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(9, {
      message: "At least 9 characters needed.",
    }),
    newPassword: z.string().min(9, {
      message: "New password must consist at least nine characters.",
    }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password did not match",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
export type UpdateEmailSchemaType = z.infer<typeof UpdateEmailSchema>;
export type UpdateNameSchemaType = z.infer<typeof UpdateNameSchema>;
