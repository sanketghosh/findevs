import type { Metadata } from "next";
import "@/app/globals.css";

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
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
