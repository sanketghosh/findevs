import { JobFilterSchemaType } from "../(main)/_schemas/job-filter";

export const createSearchParams = (filters: JobFilterSchemaType) => {
  const params = new URLSearchParams();

  // add single value fields if provided
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
