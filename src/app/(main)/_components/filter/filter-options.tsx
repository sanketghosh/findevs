// local modules
import { cn } from "@/lib/utils";
import {
  fetchDistinctCities,
  fetchDistinctCountries,
} from "@/app/(main)/_fetchers";
import { createSearchParams } from "@/app/utils/create-search-params";
import { JobFilterSchema } from "@/app/(main)/_schemas/job-filter";

// components
import JobTypes from "@/app/(main)/_components/filter/job-types";
import SeniorityOptions from "@/app/(main)/_components/filter/seniority-options";
import WorkplaceOptions from "@/app/(main)/_components/filter/workplace-options";
import { Label } from "@/components/ui/label";
import CustomSelect from "@/components/ui/custom-select";
import { Button } from "@/components/ui/button";

/**
 *
 * @param formData
 */

export async function filterJobsAction(formData: FormData) {
  "use server";

  const values = {
    jobTypes: formData.getAll("jobTypes"),
    seniorityOptions: formData.getAll("seniorityOptions"),
    workplaceOptions: formData.getAll("workplaceOptions"),
    city: formData.get("city") || null,
    country: formData.get("country") || null,
  };

  // Validate using JobFilterSchema
  const parsedValues = JobFilterSchema.parse(values);

  // console.log(parsedValues);

  /* const searchParams = new URLSearchParams({
    ...(parsedValues.city && { city: parsedValues.city.trim() }),
    ...(parsedValues.country && { country: parsedValues.country.trim() }),
  }); */

  const searchParam = createSearchParams(parsedValues);
  console.log(searchParam);
}

export default async function FilterOptions({
  className,
}: React.ComponentPropsWithRef<"div">) {
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
          <CustomSelect id="city" name="city">
            <option>All Cities</option>
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
          <CustomSelect id="country" name="country">
            <option>All Countries</option>
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
        <JobTypes />
        <SeniorityOptions />
        <WorkplaceOptions />
        <Button className="w-full">Apply Filter</Button>
      </form>
    </div>
  );
}
