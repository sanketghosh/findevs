"use client";

// packages
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2Icon, LogOutIcon } from "lucide-react";

// local modules
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

// components
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  const [isPending, setTransition] = useTransition();
  const router = useRouter();

  const signOutHandler = async () => {
    setTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("User has been signed out successfully.");
            setInterval(() => {}, 1000);
            router.push("/sign-up");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      });
    });
  };

  return (
    <Button
      variant={"destructive"}
      disabled={isPending}
      onClick={signOutHandler}
    >
      {isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <>
          Sign Out
          <LogOutIcon />
        </>
      )}
    </Button>
  );
}
