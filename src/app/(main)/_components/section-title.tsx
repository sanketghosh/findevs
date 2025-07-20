import { cn } from "@/lib/utils";
import React from "react";

type SectionTitleProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithRef<"h1">;

export default function SectionTitle({
  children,
  className,
}: SectionTitleProps) {
  return (
    <h1
      className={cn(
        "bg-secondary/50 w-fit rounded-md border px-4 py-2 text-base font-semibold lg:text-xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}
