// packages
import { format } from "date-fns";
import {
  ArrowRightIcon,
  BriefcaseBusinessIcon,
  ClockIcon,
  MapPinIcon,
  WalletIcon,
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
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
    approved,
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
    <Card className="relative w-full space-y-3.5 p-4 hover:shadow">
      <div className="flex items-center gap-3">
        <div className="size-16 overflow-hidden rounded-md border">
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
        <div className="leading-tight">
          <Link
            href={viewJobLink}
            className="text-base font-semibold lg:text-lg"
          >
            {title}
          </Link>
          <p className="font-medium text-muted-foreground">{companyName}</p>
        </div>
      </div>
      <div className="line-clamp-1 flex items-center gap-1 font-medium">
        <MapPinIcon size={17} />
        <p className="line-clamp-1 text-sm">
          {city}, {country}
          {workplace === "InCountryRemote" && ` (In Country Remote)`}
        </p>
      </div>

      {/* 3rd para */}
      <div className="flex items-center gap-3 font-medium">
        <Badge variant={"secondary"}>
          <WalletIcon size={17} />
          {sessionUserId ? (
            <JobSalary fromCurrency={currency!} salary={salary} />
          ) : (
            <p className="ml-1.5">
              {salaryFormatter(convertCurrency(currency!, "USD", salary))} USD
              PA
            </p>
          )}
        </Badge>
        <Badge variant={"secondary"}>
          <ClockIcon size={17} />
          <p className="ml-1.5">{jobType}</p>
        </Badge>
        <Badge variant={"secondary"}>
          <BriefcaseBusinessIcon size={17} />
          <p className="ml-1.5">{seniority}</p>
        </Badge>
      </div>
      <div className="flex w-full items-center justify-between">
        <h2 className="text-sm font-semibold text-muted-foreground">
          {format(createdAt, "PPP")}
        </h2>
        <div className="flex items-center gap-3">
          {/*  {approved && (
            <button onClick={() => setBookmark(!bookmark)}>
              <BookmarkIcon
                className={cn(bookmark && "fill-primary stroke-none")}
              />
            </button>
          )} */}
          {/* <Link href={viewJobLink}>
            <EyeIcon />
          </Link> */}
          <BookmarkButton jobId={jobId} bookmarkInitialState={isBookmarked} />
        </div>
      </div>
      <Badge
        className="absolute -top-1 right-2 text-sm font-semibold"
        variant={"secondary"}
      >
        {convertToReadableString(workplace)}
      </Badge>

      {/* {!approved && admin ? <Separator /> : null}
      {!approved && admin ? (
        <div className="flex items-center justify-center space-x-4">
          <ApproveButton />
          <RejectButton />
        </div>
      ) : null} */}
      <Separator />
      <Link
        href={viewJobLink}
        className={cn(
          buttonVariants({
            variant: "secondary",
          }),
          "w-full",
        )}
      >
        View Job Details
        <ArrowRightIcon />
      </Link>
    </Card>
  );
}
