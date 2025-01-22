"use server";

// packages
import { redirect } from "next/navigation";

// local modules
import { JobFilterSchema } from "@/app/(main)/_schemas/job-filter";
import { createSearchParams } from "@/app/(main)/_utils/create-search-params";

/**

    @description Handles job search form submission.
    @param {FormData} formData - The form data containing the search query.
    @throws {Error} If the form data is invalid.
    @redirects to the main page if no search query is provided.
    @redirects to the search results page with the parsed query parameters.
    */

export async function searchJobAction(formData: FormData) {
  const query = formData.get("q")?.toString().trim();

  // If no query is provided, redirect to the main page
  if (!query) {
    redirect("/");
  }

  const parsedValues = JobFilterSchema.parse({ q: query });

  const searchParam = createSearchParams(parsedValues);

  redirect(`/?${searchParam}`);
}
