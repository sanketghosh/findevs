"use client";

import { useFormStatus } from "react-dom";
import LoadingButton from "./loading-button";

export default function FormSubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { pending } = useFormStatus();

  return <LoadingButton {...props} loading={pending} type="submit" />;
}
