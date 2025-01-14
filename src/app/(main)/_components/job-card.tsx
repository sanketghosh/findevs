"use client";

// packages
import { format } from "date-fns";
import {
  BookmarkIcon,
  BriefcaseBusinessIcon,
  ClockIcon,
  HeartIcon,
  MapPinIcon,
  WalletIcon,
} from "lucide-react";

// components
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Job } from "@prisma/client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { convertToReadableString } from "@/app/utils/convert-readable-string";

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
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
  } = job;

  return (
    <Card className="relative w-full space-y-3.5 p-4 hover:shadow">
      <div className="flex items-center gap-3">
        <div className="size-16 overflow-hidden rounded-md border">
          <img
            //@ts-ignore
            src={!companyLogoUrl ? companyLogoUrl : "./company-img.webp"}
            alt={companyName}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="leading-tight">
          <h2 className="text-base font-semibold lg:text-lg">{title}</h2>
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
        <button onClick={() => setBookmark(!bookmark)}>
          <BookmarkIcon
            className={cn(bookmark && "fill-teal-700 stroke-none")}
          />
        </button>
      </div>
      <Badge
        className="absolute -top-1 right-2 text-sm font-semibold"
        variant={"secondary"}
      >
        {convertToReadableString(workplace)}
      </Badge>
    </Card>
  );
}
