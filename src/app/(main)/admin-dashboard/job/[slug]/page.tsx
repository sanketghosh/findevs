// packages
import { Metadata } from "next";
import { format } from "date-fns";
import { MegaphoneIcon, Wallet2Icon } from "lucide-react";
import { notFound } from "next/navigation";

// local modules
import { getSessionHandler } from "@/app/(main)/_utils/get-session";
import { fetchSingleJobAsAdmin } from "@/app/(main)/_fetchers";
import { isAdmin } from "@/app/(main)/_utils/is-admin";
import { cn } from "@/lib/utils";

// components
import ApproveButton from "@/app/(main)/_components/job/job-card-buttons/approve-button";
import DeleteButton from "@/app/(main)/_components/job/job-card-buttons/delete-button";
import RejectButton from "@/app/(main)/_components/job/job-card-buttons/reject-button";
import JobDescriptionMarkdown from "@/app/(main)/_components/job/job-description-markdown";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import JobSalary from "@/app/(main)/_components/job/job-salary";

type JobApplicationAdminCheckpointProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: JobApplicationAdminCheckpointProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await fetchSingleJobAsAdmin(slug!);

  return {
    title: job.job.title,
  };
}

export default async function JobApplicationAdminCheckpoint({
  params,
}: JobApplicationAdminCheckpointProps) {
  const admin = await isAdmin();
  const { id: sessionUserId } = await getSessionHandler();
  const { slug } = await params;
  //   console.log("@@SingleJob,", slug);
  const { job } = await fetchSingleJobAsAdmin(slug);
  const {
    companyLogoUrl,
    companyName,
    address,
    city,
    country,
    createdAt,
    description,
    employerEmail,
    employerWebsite,
    jobType,
    salary,
    seniority,
    title,
    workplace,
    approved,
    userId,
    currency,
    id: jobId,
  } = job;

  const applyNow = employerEmail ? `mailto:${employerEmail}` : employerWebsite;

  if (!applyNow) {
    console.error("Job has not application link or url");
    notFound();
  }

  if (!admin) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 rounded-md border p-4 shadow-sm lg:flex-row lg:items-center">
        <div className="bg-destructive flex size-12 shrink-0 items-center justify-center rounded-md text-white">
          <MegaphoneIcon />
        </div>
        <div>
          <h1 className="text-lg font-semibold lg:text-xl">You are an admin</h1>
          <p className="text-muted-foreground text-sm font-medium lg:text-base">
            Here you can check details, approve, reject from being posted in the
            dashboard or even delete a job not posted by you if needed. There
            are action buttons at the end of the page.
          </p>
        </div>
      </div>

      <div className="relative flex flex-col gap-6 md:flex-row">
        {/* sidebar */}
        <aside className="flex h-fit w-full shrink-0 flex-col gap-4 rounded-md border p-4 shadow-sm md:w-80 lg:w-96">
          {/* job status */}
          <div className="bg-secondary w-fit rounded-md border px-3 py-2">
            <h1 className="text-sm">
              Job Status: <b>{approved ? "Approved" : "Unapproved"}</b>
            </h1>
          </div>

          {/* for image  */}
          {/*  <div className="size-32 overflow-hidden rounded-md border">
            <img
              src={
                companyLogoUrl === null ? "/company-img.webp" : companyLogoUrl
              }
              alt={companyName}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-4 font-medium">
            <div className="space-y-2">
              <h1 className="text-lg font-bold lg:text-xl">{title}</h1>
              <p className="text-muted-foreground">{companyName}</p>
              <h1 className="w-fit rounded-sm bg-amber-400 px-5 py-2 text-lg font-semibold lg:text-xl dark:bg-orange-600">
                <b>Salary: </b>
                {salary}
              </h1>
            </div>

            <Separator className="" />
            <ul className="space-y-2">
              <li>
                <b>Job Type: </b>
                {jobType}
              </li>
              <li>
                <b>Seniority: </b> {seniority}
              </li>
              <li>
                <b>Workplace: </b>
                {workplace}
              </li>
              <li>
                <b>Job Location: </b>
                {city}, {country}
              </li>
              <li>
                <b>Company Address:</b> {address}
              </li>
              {employerEmail && (
                <li>
                  <b>Application Mail: </b>
                  <a
                    href={`mailto:${employerEmail}`}
                    className="text-blue-600 underline underline-offset-4"
                  >
                    {employerEmail}
                  </a>
                </li>
              )}
              {employerWebsite && (
                <li>
                  <b>Application Link: </b>
                  <a
                    href={employerWebsite}
                    className="text-blue-600 underline underline-offset-4"
                  >
                    {employerWebsite}
                  </a>
                </li>
              )}
            </ul>
            <a
              href={applyNow}
              className={cn(
                buttonVariants({
                  size: "lg",
                }),
                "w-full sm:w-fit md:w-full",
              )}
            >
              Apply Now
            </a>
            <p className="text-muted-foreground text-sm font-medium">
              Posted on {format(createdAt, "PPP")}
            </p>
          </div> */}
          {/* for image  */}
          <div className="size-32 overflow-hidden rounded-md border">
            <img
              src={
                companyLogoUrl === null ? "/company-img.webp" : companyLogoUrl
              }
              alt={companyName}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-4 font-medium">
            <div className="space-y-2">
              <h1 className="text-lg font-bold lg:text-xl">{title}</h1>
              <p className="text-muted-foreground">{companyName}</p>
              <div className="flex items-center rounded-md border px-3 py-2 text-xl font-semibold">
                <Wallet2Icon size={22} />
                <JobSalary fromCurrency={currency!} salary={salary} />
              </div>
            </div>

            <Separator className="" />
            <ul className="space-y-4">
              <li>
                <p className="text-xs">Job Type</p>
                <b className="text-lg">{jobType}</b>
              </li>
              <li>
                <p className="text-xs">Seniority</p>
                <b className="text-lg">{seniority}</b>
              </li>
              <li>
                <p className="text-xs">Workplace</p>
                <b className="text-lg">{workplace}</b>
              </li>
              <li>
                <p className="text-xs">Job Location</p>
                <b className="text-lg">
                  {city}, {country}
                </b>
              </li>
              <li>
                <p className="text-xs">Company Address</p>
                <b className="text-lg">{address}</b>
              </li>
              {employerEmail && (
                <li>
                  <p className="text-xs">Application Mail</p>
                  <a
                    href={`mailto:${employerEmail}`}
                    className="text-lg text-blue-500 underline underline-offset-4"
                  >
                    {employerEmail}
                  </a>
                </li>
              )}
              {employerWebsite && (
                <li>
                  <p className="text-xs">Application Link</p>
                  <a
                    href={employerWebsite}
                    className="text-lg text-blue-500 underline underline-offset-4"
                  >
                    {employerWebsite}
                  </a>
                </li>
              )}
            </ul>
            <a
              href={applyNow!}
              className={cn(
                buttonVariants({
                  size: "lg",
                }),
                "w-full sm:w-fit md:w-full",
              )}
            >
              Apply Now
            </a>
            <p className="text-muted-foreground text-sm font-medium">
              Posted on {format(createdAt, "PPP")}
            </p>
          </div>
        </aside>

        {/* desc markdown content */}
        <div className="w-full space-y-4 rounded-md border p-4 shadow-sm">
          <h1 className="text-xl font-bold">Job Description</h1>
          <Separator />
          {description && (
            <JobDescriptionMarkdown>{description}</JobDescriptionMarkdown>
          )}
        </div>
      </div>

      <Separator />
      <div className="text-muted-foreground">
        {sessionUserId !== userId ? (
          <p>
            <b>Note: </b>This job is not posted by you, but as an admin if you
            think it is not appropriate or have some issues, you can delete it.
          </p>
        ) : (
          <p>This job is posted by you.</p>
        )}
      </div>
      <div className="flex items-center justify-start gap-4">
        {!approved ? (
          <>
            <ApproveButton jobId={jobId} />
            <RejectButton jobId={jobId} />
          </>
        ) : (
          <DeleteButton jobId={jobId} />
        )}
      </div>
    </div>
  );
}
