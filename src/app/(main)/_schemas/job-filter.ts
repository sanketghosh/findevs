import { z } from "zod";
import {
  JOB_TYPES,
  SENIORITY_OPTIONS,
  WORKPLACE_OPTIONS,
} from "@/app/(main)/_data";

const validJobTypeIds = JOB_TYPES.map((item) => item.jobTypeId);
const validSeniorityOptionIds = SENIORITY_OPTIONS.map(
  (item) => item.seniorityOptionId,
);
const validWorkplaceOptionIds = WORKPLACE_OPTIONS.map(
  (item) => item.workplaceOptionId,
);

/**
 *
 * @description Job filter schema
 *
 */
export const JobFilterSchema = z.object({
  q: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  jobTypes: z
    .array(z.enum(validJobTypeIds as [string, ...string[]]))
    .optional(),
  workplaceOptions: z
    .array(z.enum(validWorkplaceOptionIds as [string, ...string[]]))
    .optional(),
  seniorityOptions: z
    .array(z.enum(validSeniorityOptionIds as [string, ...string[]]))
    .optional(),
});

export type JobFilterSchemaType = z.infer<typeof JobFilterSchema>;
