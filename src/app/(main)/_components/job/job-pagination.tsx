// packages
import React from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// local modules
import { cn } from "@/lib/utils";
import { JobFilterSchemaType } from "@/app/(main)/_schemas/job-filter";
import { generatePageLink } from "@/app/(main)/_utils/generate-page-link";

// components
import { buttonVariants } from "@/components/ui/button";

type JobPaginationProps = {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterSchemaType;
};

export default async function JobPagination({
  currentPage,
  filterValues,
  totalPages,
}: JobPaginationProps) {
  console.log(currentPage);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          href={generatePageLink(filterValues, currentPage - 1)}
          className={cn(
            buttonVariants({
              variant: "default",
              size: "sm",
            }),
            currentPage <= 1 && "hidden",
          )}
        >
          <ChevronLeftIcon />
          Previous
        </Link>
        <Link
          href={generatePageLink(filterValues, currentPage + 1)}
          className={cn(
            buttonVariants({
              variant: "default",
              size: "sm",
            }),
            currentPage >= totalPages && "hidden",
          )}
        >
          Next
          <ChevronRightIcon />
        </Link>
      </div>
      <div>
        <h1 className="text-sm font-medium text-muted-foreground lg:text-base">
          Page <b>{currentPage}</b> of <b>{totalPages}</b>
        </h1>
      </div>
    </div>
  );
}
