import { notFound } from "next/navigation";

// local modules
import { getSessionHandler } from "@/app/utils/get-session";
import {
  fetchPostedApprovedJobs,
  fetchPostedUnApprovedJobs,
} from "@/app/(main)/_fetchers";
import { isAdmin } from "@/app/(main)/_utils/is-admin";

// components
import JobCard from "@/app/(main)/_components/job/job-card";
import { Separator } from "@/components/ui/separator";

export default async function PostedJobs() {
  const { postedApprovedJobs } = await fetchPostedApprovedJobs();
  const { postedUnApprovedJobs } = await fetchPostedUnApprovedJobs();
  const admin = await isAdmin();

  const { email, id } = await getSessionHandler();

  if (!email && !id) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-lg font-semibold lg:text-xl">Approved Jobs</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {postedApprovedJobs.map((job) => (
            <JobCard job={job} key={job.id} admin={admin} />
          ))}
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <h1 className="text-lg font-semibold lg:text-xl">Unapproved Jobs</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {postedUnApprovedJobs.map((job) => (
            <JobCard job={job} key={job.id} admin={admin} />
          ))}
        </div>
      </div>
    </div>
  );
}
