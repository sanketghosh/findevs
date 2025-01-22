import SignUpForm from "@/app/(auth)/_components/forms/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUp() {
  return (
    <main>
      <SignUpForm />
    </main>
  );
}
