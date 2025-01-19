// packages
import { Toaster } from "sonner";
import type { Metadata } from "next";
import "@/app/globals.css";
import ThemeProvider from "@/providers/theme-provider";

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
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
