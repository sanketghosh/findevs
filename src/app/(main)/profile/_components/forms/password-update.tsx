"use client";

// packages
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Loader2Icon, PenSquareIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

// local modules
import { authClient } from "@/lib/auth-client";
import {
  ChangePasswordSchema,
  ChangePasswordSchemaType,
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

export default function UpdatePassword() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
    values: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleFormSubmit = (values: ChangePasswordSchemaType) => {
    startTransition(async () => {
      try {
        await authClient.changePassword({
          newPassword: values.confirmNewPassword,
          currentPassword: values.currentPassword,
          revokeOtherSessions: true,
        });
        toast.success("Password has been updated successfully.");
      } catch (error) {
        console.log(error);
        toast.error(
          "Something went wrong! Check the existing password or try again.",
        );
      }
    });
  };

  return (
    <CardWrapper
      title="Update Password"
      description="Enter old password to validate, then enter new password and update"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="n2ixpYtxJUwhRA"
                    type="password"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter New Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="2nODepaeRKkqiw"
                    type="password"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="2nODepaeRKkqiw"
                    type="password"
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
                Update Password
              </>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
