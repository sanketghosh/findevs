import FilterOptions from "@/app/(main)/_components/filter/filter-options";

export default function SidebarContainer() {
  return (
    <aside className="sticky top-20 hidden h-fit w-[28rem] lg:block">
      <div className="h-full w-full rounded-md border p-3 md:rounded-lg">
        <FilterOptions />
      </div>
    </aside>
  );
}
