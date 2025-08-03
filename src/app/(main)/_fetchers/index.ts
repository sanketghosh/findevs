// packages
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { JobType, Prisma, Seniority, Workplace } from "@prisma/client";

// local modules
import { JobFilterSchemaType } from "@/app/(main)/_schemas/job-filter";
import { isAdmin } from "@/app/(main)/_utils/is-admin";
import { getSessionHandler } from "@/app/(main)/_utils/get-session";

/**
    @description Fetches a list of jobs based on the provided filter criteria.
    @param {FilterProps} options - The filter options.
    @param {JobFilterSchemaType} options.jobListFilterValues - The job filter values.
    @param {number} [options.page=1] - The page number.
    @returns {Promise<{ jobs: any[], totalResults: number, totalPages: number }>} A promise that resolves with an object containing the list of jobs, total results, and total pages.
    */

type FilterProps = {
  jobListFilterValues: JobFilterSchemaType;
  page?: number;
};

export async function fetchAllJobsByFilter({
  jobListFilterValues,
  page = 1,
}: FilterProps) {
  const resolvedFilterValues = await Promise.resolve(jobListFilterValues);
  const { city, country, jobTypes, seniorityOptions, workplaceOptions, q } =
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
    ...(q && {
      OR: [
        {
          title: {
            contains: q.trim(),
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: q.trim(),
            mode: "insensitive",
          },
        },
        {
          city: {
            contains: q.trim(),
            mode: "insensitive",
          },
        },
        {
          country: {
            contains: q.trim(),
            mode: "insensitive",
          },
        },
        {
          companyName: {
            contains: q.trim(),
            mode: "insensitive",
          },
        },
      ],
    }),
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

/**

    @description Fetches a list of distinct cities from approved jobs.
    @returns {Promise<{ distinctCities: string[] }>} A promise that resolves with an object containing a list of distinct city names.
    */

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

/**

    @description Fetches a list of distinct countries from approved jobs.
    @returns {Promise<{ distinctCountries: string[] }>} A promise that resolves with an object containing a list of distinct country names.
    */

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

    @description Fetches a single job by its slug.
    @param {string} slug - The slug of the job to fetch.
    @returns {Promise<{ job: any }>} A promise that resolves with an object containing the job data.
    @throws {404} If the job is not found.
    */

export const fetchSingleJob = cache(async (slug: string) => {
  // const { id } = await getSessionHandler();
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

    @description Fetches a list of unapproved jobs. This function requires admin authentication.
    @throws {Error} If the user is not signed in with admin credentials.
    @returns {Promise<{ unApprovedJobs: any[] }>} A promise that resolves with an object containing a list of unapproved jobs.
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

    @description Fetches a list of unapproved jobs posted by the current user.
    @throws {Error} If the user is not signed in.
    @throws {Error} If the unapproved jobs cannot be fetched.
    @returns {Promise<{ postedUnApprovedJobs: any[] }>} A promise that resolves with an object containing a list of unapproved jobs posted by the current user.
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

/**

    @description Fetches a list of approved jobs posted by the current user.
    @throws {Error} If the user is not signed in.
    @throws {Error} If the approved jobs cannot be fetched.
    @returns {Promise<{ postedApprovedJobs: any[] }>} A promise that resolves with an object containing a list of approved jobs posted by the current user.
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

    @description Fetches the current user's currency.
    @throws {Error} If the user is not signed in.
    @returns {Promise<{ fetchedUserCurrency: string }>} A promise that resolves with an object containing the current user's currency.
    */
export async function fetchCurrentUserCurrency() {
  const { id } = await getSessionHandler();

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

    @description Fetches a single job by its slug, intended for admin use.
    @param {string} slug - The slug of the job to fetch.
    @throws {404} If the job is not found.
    @returns {Promise<{ job: any }>} A promise that resolves with an object containing the job data.
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

    @description Fetches the current user's bookmarks.
    @throws {Error} If the user is not authenticated.
    @throws {Error} If fetching bookmarks fails.
    @returns {Promise<{ bookmarks: any[] }>} A promise that resolves with an object containing the user's bookmarks, including the associated job data.
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
  } catch (e) {
    console.log(e);
    throw new Error("Failed to fetch bookmarks.");
  }
};
