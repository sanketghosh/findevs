"use server";

import { auth } from "@/lib/auth";
import { SignInSchema, SignInSchemaType } from "../_schemas/auth-schema";
import { prisma } from "@/lib/prisma";

export const signInAction = async (values: SignInSchemaType) => {
  const validateFields = SignInSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Fields are invalid, failed to parse.",
    };
  }

  const { email, password } = validateFields.data;

  try {
    // check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // throw existing user error
    if (!existingUser) {
      return {
        error: "User with this email does not exist. Please sign up.",
      };
    }

    // make signup complete
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    // throw success message
    return { success: "User has been logged in successfully." };
  } catch (error) {
    return {
      error: "Something went wrong while signing in. Please try again.",
    };
  }
};
