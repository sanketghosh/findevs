"use client";

// packages
import { BookmarkIcon, Loader2Icon } from "lucide-react";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";

// local modules
import { toggleBookmarkAction } from "@/app/(main)/_actions/bookmark-actions";

// components
import { Button } from "@/components/ui/button";

type BookmarkButtonProps = {
  jobId: string;
  bookmarkInitialState: boolean;
};

export default function BookmarkButton({
  jobId,
  bookmarkInitialState,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState<boolean>(bookmarkInitialState);
  const [isPending, startTransition] = useTransition();

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await toggleBookmarkAction(jobId);
      if (result.success) {
        toast.success(result.success);
        setBookmarked((prev) => !prev);
      } else {
        toast.error(result.error);
        // setBookmarked((prev) => !prev);
      }
    });
  };

  return (
    <Button
      size={"icon"}
      variant={bookmarked ? "default" : "ghost"}
      onClick={onSubmitHandler}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <BookmarkIcon
          className={bookmarked ? "fill-background" : "fill-none"}
        />
      )}
    </Button>
  );
}
