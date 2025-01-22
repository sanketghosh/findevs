// packages
import { Metadata } from "next";
import { notFound } from "next/navigation";

// local modules
import { getSessionHandler } from "@/app/(main)/_utils/get-session";
import { isAdmin } from "@/app/(main)/_utils/is-admin";
import { fetchUnApprovedJobs } from "@/app/(main)/_fetchers";

// components
import JobCard from "@/app/(main)/_components/job/job-card";
import SectionTitle from "@/app/(main)/_components/section-title";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "As an admin only you can access this page, here you can approve, reject or delete jobs.",
};

export default async function AdminDashboard() {
  const { email, id } = await getSessionHandler();
  const admin = await isAdmin();
  const { unApprovedJobs } = await fetchUnApprovedJobs();

  if (!email && !id && !admin) {
    return notFound();
  }

  return (
    <main className="space-y-4">
      {unApprovedJobs.length > 0 ? (
        <>
          <SectionTitle>Unapproved Jobs</SectionTitle>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {unApprovedJobs?.map((job) => (
              <JobCard job={job} key={job.id} admin={admin} />
            ))}
          </div>
        </>
      ) : (
        <p>No jobs here to check or validate.</p>
      )}
    </main>
  );
}
