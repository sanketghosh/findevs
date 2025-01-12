// packages
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// components
import JobCard from "@/app/(main)/_components/job-card";
import { Button } from "@/components/ui/button";
import FilterDrawer from "@/app/(main)/_components/filter-drawer";
import SidebarContainer from "@/app/(main)/_components/sidebar-container";
import Hero from "@/app/(main)/_components/hero";
import { fetchAllJobs } from "./fetchers";

export default async function Home() {
  const { jobs } = await fetchAllJobs();

  return (
    <div className="space-y-6">
      <Hero />
      <div className="flex flex-col gap-5 lg:flex-row">
        <SidebarContainer />
        <div className="block lg:hidden">
          <FilterDrawer />
        </div>
        <div className="w-full space-y-6">
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
            {jobs.map((item) => (
              <JobCard key={item.id} job={item} />
            ))}
          </div>
          <div className="flex items-center justify-end gap-4">
            <Button variant={"default"} size={"sm"}>
              <ChevronLeftIcon />
              Previous
            </Button>
            <Button variant={"default"} size={"sm"}>
              Next
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
