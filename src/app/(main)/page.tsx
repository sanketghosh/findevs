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

        <div className="w-full space-y-6">
          {/* search box */}
          <div className="flex w-full items-center">
            <div className="h-10 w-full overflow-hidden rounded-l-md border p-1 md:h-14">
              <input
                type="text"
                placeholder="Search title, description or company..."
                className="w-ful h-full w-full border-none px-3 outline-none"
              />
            </div>
            <button className="h-10 shrink-0 rounded-r-md bg-primary px-5 text-background hover:bg-primary/90 md:h-14">
              {" "}
              Search
            </button>
          </div>
          <div className="block lg:hidden">
            <FilterDrawer />
          </div>

          {/*  */}
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
