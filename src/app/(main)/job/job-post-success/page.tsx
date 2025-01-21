import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function JobPostSuccess() {
  return (
    <div className="mx-auto flex min-h-60 max-w-lg flex-col items-center justify-center space-y-2 text-center">
      <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
        You have made the post successfully
      </h1>
      <p>
        Thank you submitting. Now wait for the admin to approve it so that it
        can be shown in the job board.
      </p>
      <Link
        href={"/"}
        className={cn(
          buttonVariants({
            variant: "default",
          }),
        )}
      >
        Go Back Home
      </Link>
    </div>
  );
}
