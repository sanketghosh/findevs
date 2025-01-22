// packages
import { Metadata } from "next";
import { format } from "date-fns";
import { notFound, redirect } from "next/navigation";

// local modules
import { getSessionHandler } from "@/app/(main)/_utils/get-session";
import { isAdmin } from "@/app/(main)/_utils/is-admin";
import { fetchSingleJob } from "@/app/(main)/_fetchers";
import { cn } from "@/lib/utils";

// components
import DeleteButton from "@/app/(main)/_components/job/job-card-buttons/delete-button";
import JobDescriptionMarkdown from "@/app/(main)/_components/job/job-description-markdown";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";

type SingleJobProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params: { slug },
}: SingleJobProps): Promise<Metadata> {
  const job = await fetchSingleJob(slug);

  return {
    title: job.job.title,
    // description: job.job.description,
  };
}

export default async function SingleJob({ params }: SingleJobProps) {
  const { slug } = await params;
  const { job } = await fetchSingleJob(slug);
  const { id: sessionUserId } = await getSessionHandler();
  const admin = await isAdmin();
  // console.log("@@SingleJob,", slug);

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
    userId,
    approved,
  } = job;

  const applyNow = employerEmail ? `mailto:${employerEmail}` : employerWebsite;

  // if admin redirect it to a admin route
  if (admin) {
    redirect(`/admin-dashboard/job/${slug}`);
  }

  // if application link or email is not available it will redirect you to a not found page
  if (!applyNow) {
    console.error("Job has not application link or url");
    notFound();
  }

  // if current authenticated user is the owner of the job and also not the admin this job will not be visible to any other authenticated or non authenticated user
  if (sessionUserId !== userId && approved === false) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* sidebar */}
        <aside className="flex h-fit w-full shrink-0 flex-col gap-4 rounded-md border p-4 shadow-sm md:sticky md:top-20 md:w-80 lg:w-96">
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
              <h1 className="w-fit rounded-sm bg-amber-400 px-2 py-2 text-lg font-bold dark:bg-orange-600 lg:text-xl">
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
            <p className="text-sm font-medium text-muted-foreground">
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
      {sessionUserId === userId && (
        <>
          <Separator />
          <div className="flex items-center justify-start gap-4">
            <DeleteButton jobId={job.id} />
          </div>
        </>
      )}
    </div>
  );
}
