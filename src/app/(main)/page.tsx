// packages
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// local modules
import { JobFilterSchemaType } from "@/app/(main)/_schemas/job-filter";

// components
import { Button } from "@/components/ui/button";
import FilterDrawer from "@/app/(main)/_components/filter-drawer";
import SidebarContainer from "@/app/(main)/_components/sidebar-container";
import Hero from "@/app/(main)/_components/hero";
import JobList from "@/app/(main)/_components/job/job-list";
import { Suspense } from "react";

type HomePageProps = {
  searchParams: Promise<JobFilterSchemaType>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="space-y-6">
      <Hero />
      <div className="flex flex-col gap-5 lg:flex-row">
        <SidebarContainer defaultValues={resolvedSearchParams} />

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
            <button className="h-10 shrink-0 rounded-r-md bg-teal-700 px-5 text-background hover:bg-teal-700/90 md:h-14">
              {" "}
              Search
            </button>
          </div>
          <div className="block xl:hidden">
            <FilterDrawer defaultValues={resolvedSearchParams} />
          </div>

          {/* JOB LIST  */}

          <JobList jobListFilterValues={resolvedSearchParams} />

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
