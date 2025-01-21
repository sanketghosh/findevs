"use client";

// packages
import { FormEvent, useTransition } from "react";
import { toast } from "sonner";
import { CheckCheckIcon, Loader2Icon } from "lucide-react";

// local modules
import { approveJobAction } from "@/app/(main)/_actions/admin-actions";

// components
import { Button } from "@/components/ui/button";

type ApproveButtonProps = {
  jobId: string;
};

export default function ApproveButton({ jobId }: ApproveButtonProps) {
  const [isPending, startTransition] = useTransition();

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await approveJobAction(jobId);
      if (result.success) {
        toast.success(result.success);
        /*  setInterval(() => {
          router.push("/");
        }, 1300); */
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <Button variant={"default"} onClick={onSubmitHandler} disabled={isPending}>
      {isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <>
          <CheckCheckIcon /> Approve
        </>
      )}
    </Button>
  );
}
