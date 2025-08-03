// packages
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LayoutDashboardIcon } from "lucide-react";

// local modules
import { getSessionHandler } from "@/app/(main)/_utils/get-session";
import { isAdmin } from "@/app/(main)/_utils/is-admin";
import { fetchUnApprovedJobs } from "@/app/(main)/_fetchers";

// components
import JobCard from "@/app/(main)/_components/job/job-card";
import { Separator } from "@/components/ui/separator";

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
      <div className="space-y-1.5 py-2">
        <div className="flex items-center gap-1">
          <LayoutDashboardIcon size={20} />
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        </div>
        <p className="text-muted-foreground max-w-xl text-sm leading-tight font-medium">
          In dashboard you can check jobs which you can approve or un-approve
          jobs and do other admin related stuff.
        </p>
      </div>
      <Separator />
      <div>
        <h2 className="mb-4 font-bold">Approve or un-approve jobs.</h2>
        {unApprovedJobs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {unApprovedJobs?.map((job) => (
                <JobCard job={job} key={job.id} admin={admin} />
              ))}
            </div>
          </>
        ) : (
          <p>No jobs here to check or validate.</p>
        )}
      </div>
    </main>
  );
}
