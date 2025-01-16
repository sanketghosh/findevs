// local modules
import { filterJobsAction } from "@/app/(main)/_actions/filter-jobs-action";
import { cn } from "@/lib/utils";
import {
  fetchDistinctCities,
  fetchDistinctCountries,
} from "@/app/(main)/_fetchers";
import { JobFilterSchemaType } from "@/app/(main)/_schemas/job-filter";

// components
import JobTypes from "@/app/(main)/_components/filter/job-types";
import SeniorityOptions from "@/app/(main)/_components/filter/seniority-options";
import WorkplaceOptions from "@/app/(main)/_components/filter/workplace-options";
import { Label } from "@/components/ui/label";
import CustomSelect from "@/components/ui/custom-select";
import { Button } from "@/components/ui/button";

type FilterOptionsProps = {
  defaultValues: JobFilterSchemaType;
} & React.ComponentPropsWithRef<"div">;

export default async function FilterOptions({
  className,
  defaultValues,
}: FilterOptionsProps) {
  /** */
  const { distinctCities } = await fetchDistinctCities();
  const { distinctCountries } = await fetchDistinctCountries();

  return (
    <div className={cn(className)}>
      <form action={filterJobsAction} className="space-y-4">
        {/*  custom select for cities */}
        <div className="space-y-2 rounded-md border p-3">
          <Label htmlFor="city" className="text-base font-medium capitalize">
            Cities
          </Label>
          <CustomSelect
            id="city"
            name="city"
            defaultValue={defaultValues?.city || ""}
          >
            <option value={""}>All Cities</option>
            {distinctCities.map((city) => (
              <option
                value={city}
                key={city}
                className="cursor-pointer font-semibold"
              >
                {city}
              </option>
            ))}
          </CustomSelect>
        </div>
        {/*  custom select for countries */}
        <div className="space-y-2 rounded-md border p-3">
          <Label htmlFor="country" className="text-base font-medium capitalize">
            Countries
          </Label>
          <CustomSelect
            id="country"
            name="country"
            defaultValue={defaultValues?.country || ""}
          >
            <option value={""}>All Countries</option>
            {distinctCountries.map((country) => (
              <option
                value={country}
                key={country}
                className="cursor-pointer font-semibold"
              >
                {country}
              </option>
            ))}
          </CustomSelect>
        </div>
        <JobTypes defaultJobTypes={defaultValues?.jobTypes || []} />
        <SeniorityOptions
          defaultSeniorityOptions={defaultValues?.seniorityOptions || []}
        />
        <WorkplaceOptions
          defaultWorkplaceOptions={defaultValues?.workplaceOptions || []}
        />
        <Button className="w-full" type="submit">
          Apply Filter
        </Button>
      </form>
    </div>
  );
}
