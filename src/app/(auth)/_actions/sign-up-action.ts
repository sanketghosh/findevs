"use server";

// components
import { auth } from "@/lib/auth";
import {
  SignUpSchema,
  SignUpSchemaType,
} from "@/app/(auth)/_schemas/auth-schema";
import { prisma } from "@/lib/prisma";

export const signUpAction = async (values: SignUpSchemaType) => {
  const validateFields = SignUpSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Fields are invalid, failed to parse.",
    };
  }

  const { email, confirmPassword, name } = validateFields.data;

  try {
    // check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // throw existing user error
    if (existingUser) {
      return {
        error: "User with this email already exists. Please sign in.",
      };
    }

    // make signup complete
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password: confirmPassword,
      },
    });

    // throw success message
    return { success: "User has been registered successfully." };
  } catch (error) {
    return {
      error: "Something went wrong while signing up. Please try again.",
    };
  }
};
