// local modules
import { fetchAllJobsByFilter } from "@/app/(main)/_fetchers";
import { isAdmin } from "@/app/(main)/_utils/is-admin";
import { JobFilterSchemaType } from "@/app/(main)/_schemas/job-filter";

// packages
import JobCard from "@/app/(main)/_components/job/job-card";
import JobPagination from "@/app/(main)/_components/job/job-pagination";
import { Separator } from "@/components/ui/separator";

type JobListProps = {
  jobListFilterValues: JobFilterSchemaType;
  page?: number;
};

export default async function JobList({
  jobListFilterValues,
  page,
}: JobListProps) {
  const { jobs, totalPages, totalResults } = await fetchAllJobsByFilter({
    jobListFilterValues,
    page,
  });
  const admin = await isAdmin();

  return (
    <div className="space-y-6">
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

      {jobs.length > 0 ? (
        <>
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
            {jobs.map((item) => (
              <JobCard key={item.id} job={item} admin={admin} />
            ))}
          </div>
          <Separator />
          <JobPagination
            currentPage={page!}
            filterValues={jobListFilterValues}
            totalPages={totalPages}
          />
        </>
      ) : (
        <p className="text-muted-foreground font-medium">
          No jobs found maybe try again after adjusting the filter parameters.
        </p>
      )}
    </div>
  );
}
