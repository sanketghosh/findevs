import type { Metadata } from "next";
import "@/app/globals.css";

// components
import Header from "@/app/(main)/_components/header";
import Footer from "@/app/(main)/_components/footer";

export const metadata: Metadata = {
  title: {
    template: "%s | findevs",
    default: "findevs",
  },
  description: "Find your next developer job easily without much hassle.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative min-h-screen w-full">
      <Header />
      <div className="mx-auto max-w-[85rem] px-4 pt-6 pb-[50rem] md:pt-8 md:pb-96 lg:px-6 xl:pt-10">
        {children}
      </div>
      <div className="h-20" />
      <Footer />
    </main>
  );
}
