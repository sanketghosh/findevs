import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotAuthenticatedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="px-4">
        <Card className="w-96 md:w-[27rem] lg:w-[30rem]">
          <CardHeader>
            <CardTitle>You are not authenticated.</CardTitle>
            <CardDescription>
              If you don't have an account please consider making an account and
              if you have an account feel free to sign in and proceed.{" "}
            </CardDescription>
          </CardHeader>
          <CardFooter className="space-x-3">
            <Link
              href={"/sign-up"}
              className={cn(
                buttonVariants({
                  variant: "default",
                }),
              )}
            >
              Sign Up
            </Link>
            <Link
              href={"/sign-in"}
              className={cn(
                buttonVariants({
                  variant: "secondary",
                }),
              )}
            >
              Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
