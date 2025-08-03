"use client";

// packages
import { Loader2Icon, PenSquareIcon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// local modules
import { authClient } from "@/lib/auth-client";
import {
  UpdateEmailSchema,
  UpdateEmailSchemaType,
} from "@/app/(main)/profile/_schemas";

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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CardWrapper from "@/components/card-wrapper";

interface IUpdateEmailPropsType {
  email: string;
}

export default function UpdateEmail({ email }: IUpdateEmailPropsType) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateEmailSchemaType>({
    resolver: zodResolver(UpdateEmailSchema),
    values: {
      email: email,
    },
  });

  const handleFormSubmit = (value: UpdateEmailSchemaType) => {
    // console.log("@@@-->>  UPDATE EMAIL: ", values);
    startTransition(async () => {
      try {
        await authClient.changeEmail({
          newEmail: value.email,
          callbackURL: "/",
        });
        toast.success("User's email has been updated successfully.");
      } catch (error) {
        console.log(error);
        toast.error("Failed to update user's email address.");
      }
    });
  };

  return (
    <CardWrapper
      title="Update Email"
      description="Enter new email and then update."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email</FormLabel>
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
          <Button size={"sm"} variant={"default"} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2Icon className="animate-spin" size={20} />
                Updating
              </>
            ) : (
              <>
                <PenSquareIcon size={20} />
                Update Email
              </>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
