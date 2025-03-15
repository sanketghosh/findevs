import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center space-y-2">
      <h2 className="text-lg font-bold md:text-xl">Not Found</h2>
      <p className="text-muted-foreground">Could not find requested resource</p>
      <Link
        href="/"
        className={cn(
          buttonVariants({
            variant: "default",
          }),
        )}
      >
        Return Home
      </Link>
    </div>
  );
}
