"use server";

import { toSlug } from "@/app/utils/to-slug";
import { JobPostFormSchema } from "../_schemas/job-post-form";
import { v4 as uuid_v4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { Currency, JobType, Seniority, Workplace } from "@prisma/client";

export async function createJobAction(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    description,
    city,
    companyName,
    country,
    jobType,
    salary,
    seniority,
    workplace,
    address,
    currency,
    employerWebsite,
    employerEmail,
    companyLogo,
  } = JobPostFormSchema.parse(values);

  console.log({
    title,
    description,
    city,
    companyName,
    country,
    jobType,
    salary,
    seniority,
    workplace,
    address,
    currency,
    employerWebsite,
    employerEmail,
    companyLogo,
  });

  const customSlug = `${toSlug(title)}-${uuid_v4()}`;

  await prisma.job.create({
    data: {
      slug: customSlug,
      title: title.trim(),
      companyName: companyName,
      currency: currency as Currency,
      salary: parseInt(salary),
      jobType: jobType as JobType,
      workplace: workplace as Workplace,
      seniority: seniority as Seniority,
      city: city,
      country: country,
      employerEmail: employerEmail,
      employerWebsite: employerWebsite,
      address: address,
      description: description,
      approved: true,
    },
  });
}
