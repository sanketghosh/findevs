import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 *
 *
 * @description getSessionHandler takes nothing as parameter and returns user session details
 * @returns id, name, email, image
 *
 *
 */

export const getSessionHandler = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    sessionCreatedAt: session?.session.createdAt,
    sessionExpiresAt: session?.session.expiresAt,
    id: session?.user.id,
    name: session?.user.name,
    email: session?.user.email,
    image: session?.user.image,
  };
};
