"use client";
// packages
import { toast } from "sonner";
import { FormEvent, useTransition } from "react";
import { Loader2Icon, Trash2Icon } from "lucide-react";

// local modules
import { rejectJobAction } from "@/app/(main)/_actions/admin-actions";

// components
import { Button } from "@/components/ui/button";

type DeleteButtonProps = {
  jobId: string;
};

export default function DeleteButton({ jobId }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await rejectJobAction(jobId);
      if (result.success) {
        toast.success(result.success);
        /* setInterval(() => {
          router.push("/");
        }, 1300); */
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <Button
      variant={"destructive"}
      disabled={isPending}
      onClick={onSubmitHandler}
    >
      {isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <>
          <Trash2Icon />
          Delete
        </>
      )}
    </Button>
  );
}
