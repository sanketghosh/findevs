// packages
import { SlidersHorizontalIcon } from "lucide-react";

// components
import FilterOptions from "@/app/(main)/_components/filter/filter-options";

export default function SidebarContainer() {
  return (
    <aside className="sticky top-20 hidden h-fit xl:block xl:w-[32rem]">
      <div className="h-full w-full rounded-md border p-3 md:rounded-lg">
        <div className="mb-3 flex w-full items-center gap-1 rounded-md border bg-secondary p-2 font-semibold">
          <SlidersHorizontalIcon size={17} />
          <h2 className="uppercase">Filters</h2>
        </div>
        <FilterOptions />
      </div>
    </aside>
  );
}
