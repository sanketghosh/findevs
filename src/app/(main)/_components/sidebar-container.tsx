// packages
import { SlidersHorizontalIcon } from "lucide-react";

// local modules
import { JobFilterSchemaType } from "@/app/(main)/_schemas/job-filter";

// components
import FilterOptions from "@/app/(main)/_components/filter/filter-options";

type SidebarContainerProps = {
  defaultValues: JobFilterSchemaType;
};

export default function SidebarContainer({
  defaultValues,
}: SidebarContainerProps) {
  return (
    <aside className="sticky top-20 hidden h-fit xl:block xl:w-[32rem]">
      <div className="h-full w-full rounded-md border p-3 md:rounded-lg">
        <div className="mb-3 flex w-full items-center gap-2 rounded-md border px-3 py-3">
          <SlidersHorizontalIcon size={16} />
          <h2 className="text-sm font-medium capitalize">Filter Jobs Easily</h2>
        </div>
        <FilterOptions defaultValues={defaultValues} />
      </div>
    </aside>
  );
}
