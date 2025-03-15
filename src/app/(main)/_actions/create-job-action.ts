"use server";

// packages
import { v4 as uuid_v4 } from "uuid";
import { Currency, JobType, Seniority, Workplace } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

// local modules
import { toSlug } from "@/app/(main)/_utils/to-slug";
import { JobPostFormSchema } from "@/app/(main)/_schemas/job-post-form";
import { prisma } from "@/lib/prisma";
import { getSessionHandler } from "@/app/(main)/_utils/get-session";

cloudinary.config({
  cloud_name: process.env.NEXT_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_CLOUDINARY_API_KEY!,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET!,
});

/**
 @param {FormData} formData - The form data containing the job posting details.
 @throws {Error} If the user is not authenticated.
 @redirects to the job posting success page after creation.
 @returns {Promise<{ error: string } | void>} A promise that resolves with an error message if creation fails, or void if successful.
 @description Creates a new job posting.
*/

export async function createJobAction(formData: FormData) {
  const { email, id } = await getSessionHandler();

  if (!email && !id) {
    return {
      error: "User not authenticated to post a job.",
    };
  }

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

  let uploadedCloudinaryLogoUrl = null;

  // ✅ Upload companyLogo to Cloudinary (if exists)
  if (companyLogo instanceof File) {
    try {
      const arrayBuffer = await companyLogo.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "findevs-company-logos", // optional folder in Cloudinary
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          },
        );

        stream.end(buffer);
      });

      uploadedCloudinaryLogoUrl = (result as any).secure_url;
    } catch (error) {
      console.error("Failed to upload logo:", error);
      return { error: "Failed to upload company logo." };
    }
  }

  const customSlug = `${toSlug(title)}-${uuid_v4()}`;

  try {
    await prisma.job.create({
      data: {
        userId: id,
        slug: customSlug,
        title: title.trim(),
        companyName: companyName,
        companyLogoUrl: uploadedCloudinaryLogoUrl,
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
        approved: false,
      },
    });

    return {
      success: "Job has been created successfully.",
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
