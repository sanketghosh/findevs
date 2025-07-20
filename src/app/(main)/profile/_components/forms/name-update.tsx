"use client";

"use client";

// packages
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Loader2Icon, PenSquareIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

// local modules
import { authClient } from "@/lib/auth-client";
import {
  UpdateNameSchema,
  UpdateNameSchemaType,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardWrapper from "@/components/card-wrapper";

interface IUpdateNamePropsType {
  name: string;
}

export default function UpdateName({ name }: IUpdateNamePropsType) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateNameSchemaType>({
    resolver: zodResolver(UpdateNameSchema),
    values: {
      name: name,
    },
  });

  const handleFormSubmit = (value: UpdateNameSchemaType) => {
    // console.log("@@@-->>  UPDATE NAME: ", values);
    startTransition(async () => {
      try {
        await authClient.updateUser({
          name: value.name,
        });
        toast.success("User's name has been updated successfully");
      } catch (error) {
        toast.error("Failed to update user,");
      }
    });
  };

  return (
    <CardWrapper
      title="Update Name"
      description="Enter your new name and update."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    type="text"
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
                Update Name
              </>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
