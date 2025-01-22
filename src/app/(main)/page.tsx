// packages
import { SearchIcon } from "lucide-react";

// local modules
import { searchJobAction } from "@/app/(main)/_actions/search-job-action";

// components
import { Button } from "@/components/ui/button";
import FilterDrawer from "@/app/(main)/_components/filter/filter-drawer";
import SidebarContainer from "@/app/(main)/_components/sidebar-container";
import Hero from "@/app/(main)/_components/hero";
import JobList from "@/app/(main)/_components/job/job-list";
import { Input } from "@/components/ui/input";

type HomePageProps = {
  searchParams: Promise<{
    q?: string;
    city?: string;
    country?: string;
    jobTypes?: string[];
    workplaceOptions?: string[];
    seniorityOptions?: string[];
    page?: string;
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const { page, ...resolvedSearchParams } = await searchParams;

  // Parse page and set default to 1 if invalid
  const currentPage = page && !isNaN(Number(page)) ? parseInt(page, 10) : 1;

  return (
    <div className="space-y-6">
      <Hero />
      <div className="flex flex-col gap-5 lg:flex-row">
        <SidebarContainer defaultValues={resolvedSearchParams} />

        <div className="w-full space-y-6">
          {/* search box */}
          <form
            className="flex w-full items-center gap-2"
            action={searchJobAction}
          >
            <Input
              type="text"
              id="q"
              name="q"
              placeholder="Search title, description or company..."
              className="h-10 md:h-14"
              defaultValue={resolvedSearchParams.q}
            />
            <Button className="h-10 shrink-0 md:h-14">
              <SearchIcon />
              <p className="hidden md:block">Search</p>
            </Button>
          </form>

          <div className="block xl:hidden">
            <FilterDrawer defaultValues={resolvedSearchParams} />
          </div>

          {/* JOB LIST  */}

          <JobList
            jobListFilterValues={resolvedSearchParams}
            page={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
