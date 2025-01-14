// packages
import { Toaster } from "sonner";
import type { Metadata } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  title: "findevs",
  description: "Find your next developer job easily without much hassle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <head />
        <body>
          <Toaster />
          {children}
        </body>
      </html>
    </>
  );
}
