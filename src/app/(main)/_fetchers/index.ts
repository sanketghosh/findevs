// packages
import { JobType, Seniority, Workplace } from "@prisma/client";

// local modules
import { prisma } from "@/lib/prisma";

//components
import { JobFilterSchemaType } from "@/app/(main)/_schemas/job-filter";
import { cache } from "react";
import { notFound } from "next/navigation";
import { isAdmin } from "../_utils/is-admin";
import { NextResponse } from "next/server";
import { getSessionHandler } from "@/app/(main)/_utils/get-session";

export async function fetchAllJobsByFilter(
  jobListFilterValues: JobFilterSchemaType,
) {
  const resolvedFilterValues = await Promise.resolve(jobListFilterValues);
  const { city, country, jobTypes, seniorityOptions, workplaceOptions } =
    resolvedFilterValues;

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

  const jobs = await prisma.job.findMany({
    where: {
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
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return { jobs };
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
