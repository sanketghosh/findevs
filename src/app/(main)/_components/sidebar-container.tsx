import FilterOptions from "@/app/(main)/_components/filter/filter-options";
import { SlidersHorizontalIcon } from "lucide-react";

export default function SidebarContainer() {
  return (
    <aside className="sticky top-20 hidden h-fit w-[28rem] lg:block">
      <div className="h-full w-full rounded-md border p-3 md:rounded-lg">
        <div className="mb-3 flex items-center gap-1 font-semibold">
          <SlidersHorizontalIcon size={17} />
          <h2 className="uppercase">Filters</h2>
        </div>
        <FilterOptions />
      </div>
    </aside>
  );
}
