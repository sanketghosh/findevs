import SignInForm from "@/app/(auth)/_components/forms/sign-in-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignIn() {
  return (
    <main>
      <SignInForm />
    </main>
  );
}
