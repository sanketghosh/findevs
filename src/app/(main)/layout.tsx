import type { Metadata } from "next";
import "@/app/globals.css";

// components
import Header from "@/app/(main)/_components/header";
import Footer from "@/app/(main)/_components/footer";

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
        <main className="relative min-h-screen w-full">
          <Header />
          <div className="mx-auto max-w-[95rem] px-4 py-6 md:py-8 lg:px-6 xl:py-10">
            {children}
          </div>
          <div className="h-20" />
          <Footer />
        </main>
      </body>
    </html>
  );
}
