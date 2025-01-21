// packages
import { MoreHorizontalIcon } from "lucide-react";

// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BookmarkButton from "@/app/(main)/_components/job/job-card-buttons/bookmark-button";
import DeleteButton from "@/app/(main)/_components/job/job-card-buttons/delete-button";

export default function JobCardOptionDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuLabel>Card Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <BookmarkButton />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DeleteButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
