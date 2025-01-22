"use server";

// packages
import { revalidatePath } from "next/cache";

// local modules
import { getSessionHandler } from "@/app/(main)/_utils/get-session";
import { prisma } from "@/lib/prisma";

/**

    @description Deletes a job by its ID.
    @param {string} jobId - The ID of the job to delete.
    @throws {Error} If the user is not authenticated or does not own the job.
    @returns {Promise<{ success: string } | { error: string }>} A promise that resolves with a success message or an error message.
    */

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
