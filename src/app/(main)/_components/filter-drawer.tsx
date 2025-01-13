// packages

// components
import FilterOptions from "@/app/(main)/_components/filter/filter-options";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FilterIcon, SlidersHorizontalIcon } from "lucide-react";

export default function FilterDrawer() {
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
          <FilterOptions />
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
