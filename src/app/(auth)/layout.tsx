import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "findevs",
  description: "Signup or Login to find your next developer job.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
