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

export async function fetchDistinctLocations() {
  const distinctLocations = (await prisma.job
    .findMany({
      where: {
        approved: true,
      },
      select: {
        location: true,
      },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return { distinctLocations };
}
