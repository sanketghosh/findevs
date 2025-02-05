"use server";

// packages
import { revalidatePath } from "next/cache";

// local modules
import { getSessionHandler } from "@/app/(main)/_utils/get-session";
import { isAdmin } from "@/app/(main)/_utils/is-admin";
import { prisma } from "@/lib/prisma";

/**

    @description Approves a job, restricted to admin users.
    @param {string} jobId - The ID of the job to approve.
    @throws {Error} If the user is not authenticated or not an admin.
    @returns {Promise<{ success: string } | { error: string }>} A promise that resolves with a success message or an error message.
    */
export async function approveJobAction(jobId: string) {
  console.log(jobId);

  try {
    const { id } = await getSessionHandler();
    const admin = await isAdmin();

    if (!id) {
      return {
        error: "User is not authenticated.",
      };
    }

    if (!admin) {
      return {
        error: "User is not an admin.",
      };
    }

    await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        approved: true,
      },
    });

    revalidatePath("/");
    return {
      success: "Job has been approved.",
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

/**

    @description Rejects a job by deleting it, restricted to admin users.
    @param {string} jobId - The ID of the job to reject.
    @throws {Error} If the user is not authenticated or not an admin.
    @returns {Promise<{ success: string } | { error: string }>} A promise that resolves with a success message or an error message.
    */
export async function rejectJobAction(jobId: string) {
  //   console.log(jobId);

  try {
    const { id } = await getSessionHandler();
    const admin = await isAdmin();

    if (!id) {
      return {
        error: "User is not authenticated.",
      };
    }

    if (!admin) {
      return {
        error: "User is not an admin.",
      };
    }

    /* const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    }); */

    await prisma.job.delete({
      where: {
        id: jobId,
      },
    });

    revalidatePath("/");
    return {
      success: "Job has been rejected.",
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
