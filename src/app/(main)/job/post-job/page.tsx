import { Metadata } from "next";

// components
import CreateJobForm from "@/app/(main)/_components/forms/create-job-form";
import { getSessionHandler } from "../../_utils/get-session";
import { BookMarkedIcon, SendIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Post a job",
  description:
    "New job posting is much easier now, post a new job on findevs to find best clients.",
};

export default async function PostJob() {
  const { id: authenticatedUserId } = await getSessionHandler();

  return (
    <div className="space-y-4">
      <div className="space-y-1.5 py-2">
        <div className="flex items-center gap-1">
          <SendIcon size={20} />
          <h2 className="text-lg font-semibold">Post A Job</h2>
        </div>
        <p className="text-muted-foreground text-sm leading-tight font-medium">
          After posting the job, you have to wait for approval from admin to
          show it in dashboard.
        </p>
      </div>
      <Separator />
      <CreateJobForm authenticatedUserId={authenticatedUserId} />
    </div>
  );
}
