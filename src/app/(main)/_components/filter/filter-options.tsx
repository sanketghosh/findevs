// local modules
import { cn } from "@/lib/utils";
import { fetchDistinctLocations } from "@/app/(main)/fetchers";

// components
import JobTypes from "@/app/(main)/_components/filter/job-types";
import SeniorityOptions from "@/app/(main)/_components/filter/seniority-options";
import WorkplaceOptions from "@/app/(main)/_components/filter/workplace-options";
import { Label } from "@/components/ui/label";
import CustomSelect from "@/components/ui/custom-select";

export default async function FilterOptions({
  className,
}: React.ComponentPropsWithRef<"div">) {
  const { distinctLocations } = await fetchDistinctLocations();

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="location" className="text-base font-medium capitalize">
          Location
        </Label>
        <CustomSelect id="location" name="location">
          <option>All Location</option>
          {distinctLocations.map((location) => (
            <option
              value={location}
              key={location}
              className="cursor-pointer font-semibold"
            >
              {location}
            </option>
          ))}
        </CustomSelect>
      </div>
      <JobTypes />
      <SeniorityOptions />
      <WorkplaceOptions />
    </div>
  );
}
