"use server";

import { revalidatePath } from "next/cache";
import { getSessionHandler } from "../_utils/get-session";
import { prisma } from "@/lib/prisma";

export async function deleteJobAction(jobId: string) {
  //   console.log(jobId);

  try {
    const { id: sessionUserId } = await getSessionHandler();

    if (!sessionUserId) {
      return {
        error: "User is not authenticated.",
      };
    }

    /*  const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    }); 

    if (job?.userId !== sessionUserId) {
      return {
        error: "Job does.",
      };
    } */

    await prisma.job.delete({
      where: {
        id: jobId,
      },
    });

    revalidatePath("/");
    return {
      success: "Job has been deleted.",
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
