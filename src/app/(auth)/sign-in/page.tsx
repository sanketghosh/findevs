import SignInForm from "@/app/(auth)/_components/forms/sign-in-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "You already have an account ? That's fantastic. Just sign in and start from where you left.",
};

export default function SignIn() {
  return <SignInForm />;
}
