"use server";
// packages
import { redirect } from "next/navigation";

// local modules
import { createSearchParams } from "@/app/(main)/_utils/create-search-params";
import { JobFilterSchema } from "@/app/(main)/_schemas/job-filter";

export async function filterJobsAction(formData: FormData) {
  // form values by name
  const values = {
    jobTypes: formData.getAll("jobTypes"),
    seniorityOptions: formData.getAll("seniorityOptions"),
    workplaceOptions: formData.getAll("workplaceOptions"),
    city: formData.get("city") || undefined,
    country: formData.get("country") || undefined,
  };

  // normalize the form values
  const normalizeValues = {
    ...values,
    jobTypes: values.jobTypes.length > 0 ? values.jobTypes : undefined,
    seniorityOptions:
      values.seniorityOptions.length > 0 ? values.seniorityOptions : undefined,
    workplaceOptions:
      values.workplaceOptions.length > 0 ? values.workplaceOptions : undefined,
  };

  const parsedValues = JobFilterSchema.parse(normalizeValues);

  // console.log(parsedValues);

  const searchParam = createSearchParams(parsedValues);
  // console.log(searchParam);

  redirect(`/?${searchParam}`);
}
