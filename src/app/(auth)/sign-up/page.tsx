import SignUpForm from "@/app/(auth)/_components/forms/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Don't have an account ? No problem, just build one easily.",
};

export default function SignUp() {
  return <SignUpForm />;
}
