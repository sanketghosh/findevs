import { Metadata } from "next";

// components
import CreateJobForm from "@/app/(main)/_components/forms/create-job-form";
import { getSessionHandler } from "../../_utils/get-session";

export const metadata: Metadata = {
  title: "Post a job",
  description:
    "New job posting is much easier now, post a new job on findevs to find best clients.",
};

export default async function PostJob() {
  const { id: authenticatedUserId } = await getSessionHandler();

  return (
    <div>
      <CreateJobForm authenticatedUserId={authenticatedUserId} />
    </div>
  );
}
