// local modules
import { cn } from "@/lib/utils";

// components
import JobTypes from "@/app/(main)/_components/filter/job-types";
import SeniorityOptions from "@/app/(main)/_components/filter/seniority-options";
import WorkplaceOptions from "@/app/(main)/_components/filter/workplace-options";

export default function FilterOptions({
  className,
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div className={cn("space-y-4", className)}>
      <JobTypes />
      <SeniorityOptions />
      <WorkplaceOptions />
    </div>
  );
}
