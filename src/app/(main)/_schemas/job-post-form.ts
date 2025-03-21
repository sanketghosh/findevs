import { z } from "zod";
import {
  CURRENCY_TYPES,
  JOB_TYPES,
  SENIORITY_OPTIONS,
  WORKPLACE_OPTIONS,
} from "../_data";

const JOB_TYPE_IDS = JOB_TYPES.map((jobType) => jobType.jobTypeId);
const SENIORITY_OPTION_IDS = SENIORITY_OPTIONS.map(
  (item) => item.seniorityOptionId,
);
const WORKPLACE_OPTIONS_IDS = WORKPLACE_OPTIONS.map(
  (item) => item.workplaceOptionId,
);

const CURRENCY_TYPES_IDS = CURRENCY_TYPES.map((item) => item.currency);

const stringNormalizationZod = z
  .string()
  .min(2, { message: "Minimum 2 characters needed." })
  .max(150, { message: "Maximum 170 characters allowed." });

const CompanyLogoSchema = z
  .custom<File | null>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    { message: "Must be an image file." },
  )
  .refine(
    (file) => {
      return !file || file.size < 1024 * 1024 * 2;
    },
    { message: "File size must be less than 2 MB." },
  );

/* const CompanyLogoSchema = z
  .array(
    z
      .custom<File>()
      .refine(
        (file) => file instanceof File && file.type.startsWith("image/"),
        { message: "Each file must be an image file." },
      )
      .refine((file) => file.size < 1024 * 1024 * 2, {
        message: "Each file size must be less than 2 MB.",
      }),
  )
  .max(1, { message: "Only one file is allowed." })
  .nullable(); */
// .optional();

const EmployerContactSchema = z
  .object({
    employerEmail: z
      .string()
      .max(250, { message: "An email of maximum 250 characters are allowed." })
      .email({
        message: "Please enter a valid email",
      })
      .optional()
      .or(z.literal("")),
    employerWebsite: z
      .string()
      .max(250, {
        message: "A website URL of maximum 250 characters are allowed.",
      })
      .url({
        message: "Please a valid url.",
      })
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.employerEmail || data.employerWebsite, {
    message: "Email or website URL is required",
    path: ["employerEmail"],
  });

export const JobPostFormSchema = z
  .object({
    title: stringNormalizationZod,
    description: z
      .string()
      .min(2, { message: "Minimum 10 characters needed" })
      .max(6000, { message: "Maximum 6000 characters allowed" }),
    companyName: stringNormalizationZod,
    jobType: stringNormalizationZod.refine(
      (value) => JOB_TYPE_IDS.includes(value),
      {
        message: "Job type is not valid.",
      },
    ),
    workplace: stringNormalizationZod.refine(
      (value) => WORKPLACE_OPTIONS_IDS.includes(value),
      {
        message: "Workplace option is not valid.",
      },
    ),
    seniority: stringNormalizationZod.refine(
      (value) => SENIORITY_OPTION_IDS.includes(value),
      {
        message: "Seniority option is not valid.",
      },
    ),
    currency: z
      .string()
      .refine((value) => CURRENCY_TYPES_IDS.includes(value))
      .optional(),
    city: stringNormalizationZod,
    country: stringNormalizationZod,
    address: z
      .string()
      .max(500, { message: "Maximum 500 characters allowed." })
      .optional(),
    salary: stringNormalizationZod.regex(/^\d+$/, "Must be a number").max(9, {
      message: "Number cannot be longer than 9 digits.",
    }),
    companyLogo: CompanyLogoSchema,
  })
  .and(EmployerContactSchema)
  .refine(
    (data) => {
      if (data.workplace === "Remote") {
        data.city = "Anywhere";
        data.country = "Anywhere";
      }
      return true;
    },
    {
      message: "City and country must be set to 'Anywhere' for remote jobs.",
      path: ["workplace"],
    },
  );

export type JobPostFormSchemaType = z.infer<typeof JobPostFormSchema>;
