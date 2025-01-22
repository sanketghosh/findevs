"use server";

import { revalidatePath } from "next/cache";
import { getSessionHandler } from "@/app/(main)/_utils/get-session";
import { prisma } from "@/lib/prisma";

/**

    @description Toggles a job's bookmark status for the current user.
    @param {string} jobId - The ID of the job to toggle bookmark status for.
    @throws {Error} If the job ID is missing or the user is not authorized.
    @returns {Promise<{ success: string } | { error: string }>} A promise that resolves with a success message or an error message.
    */
export async function toggleBookmarkAction(jobId: string) {
  // if jobId does not exist
  if (!jobId) {
    return {
      error: "Job ID is required.",
    };
  }

  // get authenticated users id
  const { id: sessionUserId } = await getSessionHandler();

  if (!sessionUserId) {
    return {
      error: "User not authorized",
    };
  }

  try {
    // Check if the job is already bookmarked
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_jobId: {
          userId: sessionUserId!,
          jobId: jobId,
        },
      },
    });

    if (existingBookmark) {
      // Remove bookmark
      await prisma.bookmark.delete({
        where: {
          userId_jobId: {
            userId: sessionUserId!,
            jobId: jobId,
          },
        },
      });
      revalidatePath("/");
      return { success: "Job removed from bookmarks." };
    } else {
      // Add bookmark
      await prisma.bookmark.create({
        data: {
          userId: sessionUserId!,
          jobId: jobId,
        },
      });
      return { success: "Job added to bookmarks." };
    }
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
