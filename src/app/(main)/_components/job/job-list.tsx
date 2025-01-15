import { fetchAllJobsByFilter } from "@/app/(main)/_fetchers";
import JobCard from "@/app/(main)/_components/job/job-card";
import { JobFilterSchemaType } from "../../_schemas/job-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

type JobListProps = {
  jobListFilterValues: JobFilterSchemaType;
};

export default async function JobList({ jobListFilterValues }: JobListProps) {
  const { jobs } = await fetchAllJobsByFilter(jobListFilterValues);

  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
      {jobs.map((item) => (
        <JobCard key={item.id} job={item} />
      ))}
      {jobs.length === 0 && (
        <p>
          No jobs found maybe try again after adjusting the filter parameters.
        </p>
      )}
    </div>
  );
}
