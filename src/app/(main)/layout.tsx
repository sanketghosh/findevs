import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/app/(main)/_components/header";

export const metadata: Metadata = {
  title: "findevs",
  description: "Find your next developer job easily without much hassle.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
