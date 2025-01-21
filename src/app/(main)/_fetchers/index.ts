// packages
import { JobType, Prisma, Seniority, Workplace } from "@prisma/client";

// local modules
import { prisma } from "@/lib/prisma";

//components
import { JobFilterSchemaType } from "@/app/(main)/_schemas/job-filter";
import { cache } from "react";
import { notFound } from "next/navigation";
import { isAdmin } from "../_utils/is-admin";
import { NextResponse } from "next/server";
import { getSessionHandler } from "@/app/(main)/_utils/get-session";

type FilterProps = {
  jobListFilterValues: JobFilterSchemaType;
  page?: number;
};

export async function fetchAllJobsByFilter({
  jobListFilterValues,
  page = 1,
}: FilterProps) {
  const resolvedFilterValues = await Promise.resolve(jobListFilterValues);
  const { city, country, jobTypes, seniorityOptions, workplaceOptions } =
    resolvedFilterValues;

  const jobsPerPage = 5;
  const skip = (page - 1) * jobsPerPage;

  // normalize the filter values
  const normalizedJobTypes = Array.isArray(jobTypes)
    ? jobTypes
    : jobTypes
      ? [jobTypes]
      : [];

  const normalizedSeniorityOptions = Array.isArray(seniorityOptions)
    ? seniorityOptions
    : seniorityOptions
      ? [seniorityOptions]
      : [];

  const normalizedWorkplaceOptions = Array.isArray(workplaceOptions)
    ? workplaceOptions
    : workplaceOptions
      ? [workplaceOptions]
      : [];

  const filterCriteria: Prisma.JobWhereInput = {
    approved: true,
    ...(city && { city: { equals: city?.trim(), mode: "insensitive" } }),
    ...(country && {
      country: { equals: country?.trim(), mode: "insensitive" },
    }),
    ...(normalizedJobTypes?.length && {
      jobType: {
        in: normalizedJobTypes as JobType[],
      },
    }),
    ...(normalizedSeniorityOptions?.length && {
      seniority: {
        in: normalizedSeniorityOptions as Seniority[],
      },
    }),
    ...(normalizedWorkplaceOptions?.length && {
      workplace: {
        in: normalizedWorkplaceOptions as Workplace[],
      },
    }),
  };

  const jobsPromise = prisma.job.findMany({
    where: filterCriteria,
    orderBy: {
      createdAt: "desc",
    },
    take: jobsPerPage,
    skip: skip,
  });

  const countPromise = prisma.job.count({
    where: filterCriteria,
  });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);

  const totalPages = Math.ceil(totalResults / jobsPerPage);

  console.log({
    // jobs,
    totalPages,
    totalResults,
  });
  return { jobs, totalResults, totalPages };
}

export async function fetchDistinctCities() {
  const distinctCities = (await prisma.job
    .findMany({
      where: {
        approved: true,
      },
      select: {
        city: true,
      },
      distinct: ["city"],
    })
    .then((cities) =>
      cities.map(({ city }) => city).filter(Boolean),
    )) as string[];

  return { distinctCities };
}

export async function fetchDistinctCountries() {
  const distinctCountries = (await prisma.job
    .findMany({
      where: {
        approved: true,
      },
      select: {
        country: true,
      },
      distinct: ["country"],
    })
    .then((countries) =>
      countries.map(({ country }) => country).filter(Boolean),
    )) as string[];

  return { distinctCountries };
}

/**
 *
 */
export const fetchSingleJob = cache(async (slug: string) => {
  const { id } = await getSessionHandler();
  console.log("@@@ server fetched", slug);
  const job = await prisma.job.findUnique({
    where: {
      slug,
      // approved: true,
    },
  });

  if (!job) notFound();

  return { job };
});

/**
 * fetch non approved jobs
 */

export const fetchUnApprovedJobs = async () => {
  const admin = await isAdmin();
  const { email, id } = await getSessionHandler();

  if (!email && !id) {
    throw new Error("SignIn with admin credentials to access.");
  }

  if (!admin) {
    throw new Error("Please log in with admin email");
  }

  const unApprovedJobs = await prisma.job.findMany({
    where: {
      approved: false,
    },
  });

  return { unApprovedJobs };
};

/**
 *
 *
 *
 */

export const fetchPostedUnApprovedJobs = async () => {
  const { email, id } = await getSessionHandler();

  if (!email && !id) {
    throw new Error("SignIn with admin credentials to access.");
  }

  const postedUnApprovedJobs = await prisma.job.findMany({
    where: {
      userId: id,
      approved: false,
    },
  });

  if (!postedUnApprovedJobs) {
    throw new Error("Sorry cannot fetch un approved jobs");
  }

  return { postedUnApprovedJobs };
};

/***
 *
 *
 *
 *
 */
export const fetchPostedApprovedJobs = async () => {
  const { email, id } = await getSessionHandler();

  if (!email && !id) {
    throw new Error("SignIn with admin credentials to access.");
  }

  const postedApprovedJobs = await prisma.job.findMany({
    where: {
      userId: id,
      approved: true,
    },
  });

  if (!postedApprovedJobs) {
    throw new Error("Sorry cannot fetch approved jobs");
  }

  return { postedApprovedJobs };
};

/**
 *
 *
 *
 */
export async function fetchCurrentUserCurrency() {
  const { email, id } = await getSessionHandler();

  const fetchedUserCurrency = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      userCurrency: true,
    },
  });

  return { fetchedUserCurrency };
}

/**
 *
 *
 *
 */

export const fetchSingleJobAsAdmin = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: {
      slug,
      // approved: true,
    },
  });

  if (!job) notFound();

  return { job };
});

/**
 *
 *
 */
export const fetchBookmarks = async () => {
  const { id: sessionUserId } = await getSessionHandler();

  // if user is not authenticated
  if (!sessionUserId) {
    throw new Error("User is not authenticated.");
  }

  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: sessionUserId,
      },
      include: {
        job: true,
      },
    });
    return { bookmarks };
  } catch (error) {
    throw new Error("Failed to fetch bookmarks.");
  }
};
