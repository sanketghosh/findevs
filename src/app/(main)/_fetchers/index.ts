// packages
import { JobType, Seniority, Workplace } from "@prisma/client";

// local modules
import { prisma } from "@/lib/prisma";

//components
import { JobFilterSchemaType } from "@/app/(main)/_schemas/job-filter";

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
