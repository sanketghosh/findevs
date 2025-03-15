// packages
import { Metadata } from "next";
import { SearchIcon } from "lucide-react";

// local modules
import { getTitle } from "@/app/(main)/_utils/get-title";
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

type PageProps = {
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

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  // console.log("@@@ METADATA", { city, country, q });
  const { city, country, q } = await searchParams;

  return {
    title: !getTitle({ city, country, q })
      ? "findevs"
      : getTitle({ city, country, q }),
    // title: `${getTitle({ city, country, q })}| findevs`,
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const { page, ...resolvedSearchParams } = await searchParams;

  // Parse page and set default to 1 if invalid
  const currentPage = page && !isNaN(Number(page)) ? parseInt(page, 10) : 1;

  return (
    <div className="space-y-6">
      <Hero
        city={resolvedSearchParams.city}
        country={resolvedSearchParams.country}
        q={resolvedSearchParams.q}
      />
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
