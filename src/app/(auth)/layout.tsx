import type { Metadata } from "next";
import "@/app/globals.css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: {
    template: "%s | findevs",
    default: "findevs",
  },
  description: "Just make an account or login and get started",
};
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center p-4">
      {children}
    </main>
  );
}
