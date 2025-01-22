import { JobFilterSchemaType } from "@/app/(main)/_schemas/job-filter";

export const createSearchParams = (filters: JobFilterSchemaType) => {
  const params = new URLSearchParams();

  /* const searchParams = new URLSearchParams({
    ...(parsedValues.city && { city: parsedValues.city.trim() }),
    ...(parsedValues.country && { country: parsedValues.country.trim() }),
  }); */

  // add single value fields if provided
  if (filters.q) params.set("q", filters.q.trim());
  if (filters.city) params.set("city", filters.city);
  if (filters.country) params.set("country", filters.country);

  // add multi checked fields
  if (filters.jobTypes && filters.jobTypes.length > 0) {
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
  }

  return params.toString();
};
