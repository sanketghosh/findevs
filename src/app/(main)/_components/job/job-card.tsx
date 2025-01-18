"use client";

// packages
import { useState } from "react";
import { format } from "date-fns";
import {
  BookmarkIcon,
  BriefcaseBusinessIcon,
  CheckCheckIcon,
  ClockIcon,
  EyeIcon,
  MapPinIcon,
  WalletIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { Job } from "@prisma/client";

// local modules
import { convertToReadableString } from "@/app/utils/convert-readable-string";
import { cn } from "@/lib/utils";

// components
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type JobCardProps = {
  job: Job;
  admin: boolean;
};

export default function JobCard({ job, admin = false }: JobCardProps) {
  const [bookmark, setBookmark] = useState<boolean>(false);

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
  } = job;

  return (
    <Card className="relative w-full space-y-3.5 p-4 hover:shadow">
      <div className="flex items-center gap-3">
        <div className="size-16 overflow-hidden rounded-md border">
          <img
            src={companyLogoUrl === null ? "/company-img.webp" : companyLogoUrl}
            alt={companyName}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="leading-tight">
          <Link
            href={`/job/${slug}`}
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
        {/* <div className="line-clamp-1 flex items-center gap-1 rounded-md border bg-secondary px-2 py-1 font-medium">
          <WalletIcon size={17} />
          <p className="line-clamp-1 text-sm">120000 INR PA</p>
        </div> */}
        <Badge variant={"secondary"}>
          <WalletIcon size={17} />
          <p className="ml-1.5">{salary} INR PA</p>
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
          {approved && (
            <button onClick={() => setBookmark(!bookmark)}>
              <BookmarkIcon
                className={cn(bookmark && "fill-primary stroke-none")}
              />
            </button>
          )}
          <Link href={`/job/${slug}`}>
            <EyeIcon />
          </Link>
        </div>
      </div>
      <Badge
        className="absolute -top-1 right-2 text-sm font-semibold"
        variant={"secondary"}
      >
        {convertToReadableString(workplace)}
      </Badge>

      {!approved && admin ? <Separator /> : null}
      {!approved && admin ? (
        <div className="flex items-center justify-center space-x-4">
          <Button className="w-full">
            <CheckCheckIcon /> Approve
          </Button>
          <Button variant={"destructive"} className="w-full">
            <XIcon />
            Reject
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
