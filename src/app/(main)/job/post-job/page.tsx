import { Metadata } from "next";

// components
import CreateJobForm from "@/app/(main)/_components/forms/create-job-form";

export const metadata: Metadata = {
  title: "Post a job",
  description:
    "New job posting is much easier now, post a new job on findevs to find best clients.",
};

export default function PostJob() {
  return (
    <div className="">
      <CreateJobForm />
    </div>
  );
}
