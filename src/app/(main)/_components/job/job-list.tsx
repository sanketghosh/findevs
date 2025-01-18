import { fetchAllJobsByFilter } from "@/app/(main)/_fetchers";
import JobCard from "@/app/(main)/_components/job/job-card";
import { JobFilterSchemaType } from "../../_schemas/job-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import CustomSelect from "@/components/ui/custom-select";
import { CURRENCIES_VALUES } from "../../_data";
import { Button } from "@/components/ui/button";
import { isAdmin } from "../../_utils/is-admin";

type JobListProps = {
  jobListFilterValues: JobFilterSchemaType;
};

export default async function JobList({ jobListFilterValues }: JobListProps) {
  const { jobs } = await fetchAllJobsByFilter(jobListFilterValues);
  const admin = await isAdmin();

  return (
    <div className="space-y-4">
      {/* <div className="flex w-[450px] items-center gap-2">
        <CustomSelect name="currencyValue">
          <option value="" hidden className="capitalize">
            Currency Want To Convert To
          </option>
          {CURRENCIES_VALUES.map((item) => (
            <option key={item.currencyId} value={item.currencyId}>
              {item.currencyId}
            </option>
          ))}
        </CustomSelect>
        <Button>Set</Button>
      </div> */}

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        {jobs.map((item) => (
          <JobCard key={item.id} job={item} admin={admin} />
        ))}
        {jobs.length === 0 && (
          <p>
            No jobs found maybe try again after adjusting the filter parameters.
          </p>
        )}
      </div>
    </div>
  );
}
