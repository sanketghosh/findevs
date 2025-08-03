"use client";

// packages
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { HomeIcon, Loader2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

// local modules
import {
  SignInSchema,
  SignInSchemaType,
} from "@/app/(auth)/_schemas/auth-schema";
import { signInAction } from "@/app/(auth)/_actions/sign-in-action";

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CardWrapper from "@/components/card-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";

export default function SignInForm() {
  // states
  const router = useRouter();
  /* const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>(); */
  const [isPending, startTransition] = useTransition();

  // react hook form setting up and default values
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler = async (values: SignInSchemaType) => {
    // setError("");
    // setSuccess("");
    startTransition(async () => {
      const result = await signInAction(values);
      if (result.success) {
        // setSuccess(result.success);
        toast.success(result.success);
        setInterval(() => {}, 1000);
        router.push("/");
      } else {
        // setError(result.error);
        toast.error(result.error);
      }
    });
  };

  const fillAdminCredentials = () => {
    form.setValue("email", "johndoe@mail.com");
    form.setValue("password", "123456789");
    toast.success("Admin credentials has been added.");
  };

  const fillUserCredentials = () => {
    form.setValue("email", "sarah@mail.com");
    form.setValue("password", "123456789");
    toast.success("User credentials has been added.");
  };

  return (
    <div className="space-y-4">
      <Link
        href={"/"}
        className={cn(
          buttonVariants({
            size: "icon",
            variant: "secondary",
          }),
        )}
      >
        <HomeIcon />
      </Link>
      <CardWrapper
        title="FINDEVS - signin"
        description="start from exactly where you left last time, just signin"
        footerText="Don't have an account ? SignUp"
        footerHref="/sign-up"
        className="w-full sm:w-[400px] md:w-[450px] lg:w-[490px]"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <div className="space-y-3 md:space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="johndoe@mail.com"
                        type="email"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="C5AjJHe9FQvLlg"
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="mt-3 w-full md:mt-4">
              {isPending ? <Loader2Icon className="animate-spin" /> : "Sign In"}
            </Button>
          </form>
          <div className="mt-6 flex w-full items-center space-x-3">
            <Button
              variant={"secondary"}
              className="w-full flex-1"
              onClick={fillAdminCredentials}
            >
              Admin Credentials
            </Button>
            <Button
              variant={"secondary"}
              className="w-full flex-1"
              onClick={fillUserCredentials}
            >
              User Credentials
            </Button>
          </div>
        </Form>
      </CardWrapper>
    </div>
  );
}
