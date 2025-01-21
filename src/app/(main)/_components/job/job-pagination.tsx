import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { JobFilterSchemaType } from "../../_schemas/job-filter";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { generatePageLink } from "../../_utils/generate-page-link";

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
  return (
    <div className="flex items-center justify-start gap-4">
      <Link
        href={generatePageLink(filterValues, currentPage - 1)}
        className={cn(
          buttonVariants({
            variant: "default",
            size: "sm",
          }),
          currentPage <= 1 && "point",
        )}
      >
        <ChevronLeftIcon />
        Previous
      </Link>
      <Link
        href=""
        className={cn(
          buttonVariants({
            variant: "default",
            size: "sm",
          }),
        )}
      >
        Next
        <ChevronRightIcon />
      </Link>
    </div>
  );
}
