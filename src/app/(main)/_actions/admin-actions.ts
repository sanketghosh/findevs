"use server";

import { revalidatePath } from "next/cache";
import { getSessionHandler } from "../_utils/get-session";
import { isAdmin } from "../_utils/is-admin";
import { prisma } from "@/lib/prisma";

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

/***
 *
 *
 *
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
