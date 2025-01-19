// packages
import { SlidersHorizontalIcon } from "lucide-react";

// local modules
import { JobFilterSchemaType } from "@/app/(main)/_schemas/job-filter";

// components
import FilterOptions from "@/app/(main)/_components/filter/filter-options";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type FilterDrawerProps = {
  defaultValues: JobFilterSchemaType;
};

export default function FilterDrawer({ defaultValues }: FilterDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className="flex w-full items-center gap-1"
          variant={"secondary"}
        >
          <SlidersHorizontalIcon size={18} />
          Filter Jobs
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-left">Filter</DrawerTitle>
        </DrawerHeader>
        <div className="p-3">
          <FilterOptions defaultValues={defaultValues} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
