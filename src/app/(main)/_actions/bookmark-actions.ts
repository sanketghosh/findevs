"use server";

import { revalidatePath } from "next/cache";
import { getSessionHandler } from "../_utils/get-session";
import { prisma } from "@/lib/prisma";

/**
 *
 * @param jobId
 * @returns
 */
/* export async function addJobToBookmarkAction(jobId: string) {
  // if jobId is not provided
  if (!jobId) {
    return {
      error: "JobId is required",
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
    // check if bookmark already exists
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_jobId: {
          userId: sessionUserId,
          jobId: jobId,
        },
      },
    });

    if (existingBookmark) {
      return {
        error: "Job is already bookmarked",
      };
    }

    await prisma.bookmark.create({
      data: {
        userId: sessionUserId,
        jobId: jobId,
      },
    });

    return {
      success: "Added to bookmark.",
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
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
          userId: sessionUserId,
          jobId: jobId,
        },
      },
    });

    if (existingBookmark) {
      // Remove bookmark
      await prisma.bookmark.delete({
        where: {
          userId_jobId: {
            userId: sessionUserId,
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
          userId: sessionUserId,
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
