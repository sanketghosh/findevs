import { prisma } from "@/lib/prisma";

export async function fetchAllJobs() {
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
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
