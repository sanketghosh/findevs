import SignInForm from "@/app/(auth)/_components/forms/sign-in-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignIn() {
  return <SignInForm />;
}
