import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "lucide-react";

export default function BookmarkButton() {
  return (
    <Button size={"sm"} variant={"default"}>
      <BookmarkIcon />
      Bookmark
    </Button>
  );
}
