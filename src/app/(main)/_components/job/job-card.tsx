// packages
import { format } from "date-fns";
import {
  ArrowRightIcon,
  BriefcaseBusinessIcon,
  ClockIcon,
  LaptopIcon,
  MapPinIcon,
} from "lucide-react";
import Link from "next/link";
import { Job } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// local modules
import { cn } from "@/lib/utils";
import { getSessionHandler } from "@/app/(main)/_utils/get-session";
import { convertToReadableString } from "@/utils/convert-readable-string";
import { convertCurrency } from "@/app/(main)/_utils/convert-currency";
import { salaryFormatter } from "@/app/(main)/_utils/salary-formatter";

// components
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import JobSalary from "@/app/(main)/_components/job/job-salary";
import BookmarkButton from "@/app/(main)/_components/job/job-card-buttons/bookmark-button";

type JobCardProps = {
  job: Job;
  admin: boolean;
};

export default async function JobCard({ job, admin = false }: JobCardProps) {
  // const [bookmark, setBookmark] = useState<boolean>(false);
  const { id: sessionUserId } = await getSessionHandler();

  // const admin = await isAdmin();

  const {
    companyLogoUrl,
    companyName,
    createdAt,
    jobType,
    city,
    salary,
    seniority,
    title,
    workplace,
    country,
    slug,
    currency,
    id: jobId,
  } = job;

  // Check bookmark status only if user is logged in
  const isBookmarked = sessionUserId
    ? !!(await prisma.bookmark.findUnique({
        where: {
          userId_jobId: {
            userId: sessionUserId,
            jobId: jobId,
          },
        },
      }))
    : false;

  const viewJobLink = admin ? `/admin-dashboard/job/${slug}` : `/job/${slug}`;

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{companyName}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="size-14 shrink-0 overflow-hidden rounded-md border">
            <img
              src={
                companyLogoUrl === null || companyLogoUrl.length === 0
                  ? "/company-img.webp"
                  : companyLogoUrl
              }
              alt={companyName}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center font-semibold">
              {sessionUserId ? (
                <JobSalary fromCurrency={currency!} salary={salary} />
              ) : (
                <p>
                  {salaryFormatter(convertCurrency(currency!, "USD", salary))}{" "}
                  USD PA
                </p>
              )}
            </div>{" "}
            <div className="line-clamp-1 flex items-center gap-1 font-medium">
              <MapPinIcon size={17} />
              <p className="line-clamp-1 text-sm">
                {city}, {country}
                {workplace === "InCountryRemote" && ` (In Country Remote)`}
              </p>
            </div>
          </div>
        </div>

        {/* 4th para */}
        <div className="flex flex-wrap items-center gap-3 font-medium uppercase">
          <Badge variant={"secondary"}>
            <LaptopIcon size={17} />
            <p className="ml-0.5">{convertToReadableString(workplace)}</p>
          </Badge>

          <Badge variant={"secondary"}>
            <ClockIcon size={17} />
            <p className="ml-0.5">{jobType}</p>
          </Badge>
          <Badge variant={"secondary"}>
            <BriefcaseBusinessIcon size={17} />
            <p className="ml-0.5">{seniority}</p>
          </Badge>
        </div>

        <div className="flex w-full items-center justify-between">
          <h2 className="text-muted-foreground text-sm font-semibold">
            {format(createdAt, "PPP")}
          </h2>

          <BookmarkButton jobId={jobId} bookmarkInitialState={isBookmarked} />
        </div>

        {/* {!approved && admin ? <Separator /> : null}
      {!approved && admin ? (
        <div className="flex items-center justify-center space-x-4">
          <ApproveButton />
          <RejectButton />
        </div>
      ) : null} */}
      </CardContent>
      <CardFooter>
        <Link href={viewJobLink} className={cn(buttonVariants({}), "w-full")}>
          View Job Details
          <ArrowRightIcon />
        </Link>
      </CardFooter>
    </Card>
  );
}
