// packages
import { format } from "date-fns";
import {
  BriefcaseBusinessIcon,
  ClockIcon,
  HeartIcon,
  MapPinIcon,
  WalletIcon,
} from "lucide-react";

// components
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function JobCard() {
  return (
    <Card className="relative w-full space-y-3.5 p-4 hover:shadow">
      <div className="flex items-center gap-3">
        <div className="size-16 rounded-md border">
          <img
            src="./google-logo.png"
            alt="hero image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="leading-tight">
          <h2 className="text-base font-semibold lg:text-lg">
            Full Stack Developer
          </h2>
          <p className="font-medium text-muted-foreground">Google inc.</p>
        </div>
      </div>
      <div className="line-clamp-1 flex items-center gap-1 font-medium">
        <MapPinIcon size={17} />
        <p className="line-clamp-1 text-sm">San Francisco, United States</p>
      </div>

      {/* 3rd para */}
      <div className="flex items-center gap-3 font-medium">
        {/* <div className="line-clamp-1 flex items-center gap-1 rounded-md border bg-secondary px-2 py-1 font-medium">
          <WalletIcon size={17} />
          <p className="line-clamp-1 text-sm">120000 INR PA</p>
        </div> */}
        <Badge variant={"secondary"}>
          <WalletIcon size={17} />
          <p className="ml-1.5 text-sm">120000 INR PA</p>
        </Badge>
        <Badge variant={"secondary"}>
          <ClockIcon size={17} />
          <p className="ml-1.5 text-sm">Part Time</p>
        </Badge>
        <Badge variant={"secondary"}>
          <BriefcaseBusinessIcon size={17} />
          <p className="ml-1.5 text-sm">Entry Level</p>
        </Badge>
      </div>
      <div className="flex w-full items-center justify-between">
        <h2 className="font-medium">{format(new Date(), "PPP")}</h2>
        <button>
          <HeartIcon />
        </button>
      </div>
      <Badge
        className="absolute -top-1 right-2 font-medium"
        variant={"outline"}
      >
        Remote
      </Badge>
    </Card>
  );
}
