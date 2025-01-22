import { JobFilterSchemaType } from "@/app/(main)/_schemas/job-filter";

export const generatePageLink = (
  filters: JobFilterSchemaType,
  page: number,
) => {
  const params = new URLSearchParams();

  // add single value fields if provided
  if (filters.q) params.set("q", filters.q);
  if (filters.city) params.set("city", filters.city);
  if (filters.country) params.set("country", filters.country);

  // add multi checked fields
  /* if (filters.jobTypes && filters.jobTypes.length > 0) {
    filters.jobTypes.forEach((type) => params.append("jobTypes", type));
  }

  if (filters.workplaceOptions && filters.workplaceOptions.length > 0) {
    filters.workplaceOptions.forEach((option) =>
      params.append("workplaceOptions", option),
    );
  }
  if (filters.seniorityOptions && filters.seniorityOptions.length > 0) {
    filters.seniorityOptions.forEach((option) =>
      params.append("seniorityOptions", option),
    );
  } */
  // Normalize multi-checked fields to ensure they are always arrays
  const jobTypes = Array.isArray(filters.jobTypes) ? filters.jobTypes : [];
  const workplaceOptions = Array.isArray(filters.workplaceOptions)
    ? filters.workplaceOptions
    : [];
  const seniorityOptions = Array.isArray(filters.seniorityOptions)
    ? filters.seniorityOptions
    : [];

  // Add multi-checked fields
  jobTypes.forEach((type) => params.append("jobTypes", type));
  workplaceOptions.forEach((option) =>
    params.append("workplaceOptions", option),
  );
  seniorityOptions.forEach((option) =>
    params.append("seniorityOptions", option),
  );

  // Add page parameter
  if (page > 0) params.set("page", page.toString());

  return `/?${params.toString()}`;
};
