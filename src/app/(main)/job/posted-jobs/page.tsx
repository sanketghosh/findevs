// packages
import { notFound } from "next/navigation";
import { Metadata } from "next";

// local modules
import { getSessionHandler } from "@/app/(main)/_utils/get-session";
import {
  fetchPostedApprovedJobs,
  fetchPostedUnApprovedJobs,
} from "@/app/(main)/_fetchers";
import { isAdmin } from "@/app/(main)/_utils/is-admin";

// components
import JobCard from "@/app/(main)/_components/job/job-card";
import { Separator } from "@/components/ui/separator";
import SectionTitle from "@/app/(main)/_components/section-title";

export const metadata: Metadata = {
  title: "All the jobs you have posted",
  description:
    "Here is the list of all the jobs you have posted, Here approved and unapproved jobs will be posted.",
};

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
      {postedApprovedJobs.length > 0 ? (
        <div className="space-y-4">
          <SectionTitle>Approved Jobs</SectionTitle>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {postedApprovedJobs.map((job) => (
              <JobCard job={job} key={job.id} admin={admin} />
            ))}
          </div>
        </div>
      ) : (
        <p>No approved jobs found.</p>
      )}
      <Separator />
      {postedUnApprovedJobs.length > 0 ? (
        <div className="space-y-4">
          <SectionTitle>Unapproved Jobs</SectionTitle>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {postedUnApprovedJobs.map((job) => (
              <JobCard job={job} key={job.id} admin={admin} />
            ))}
          </div>
        </div>
      ) : (
        <p>No approved jobs found.</p>
      )}
    </div>
  );
}
