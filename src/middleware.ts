import axios from "axios"; // Import Axios
import type { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

type Session = typeof auth.$Infer.Session;

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await axios.get<Session>(`/api/auth/get-session`, {
    baseURL: request.nextUrl.origin,
    headers: {
      // Get the cookie from the request
      cookie: request.headers.get("cookie") || "",
    },
  });

  console.log(session);

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();

  /*  try {
    // Use native fetch for compatibility with Edge runtime
    const response = await fetch(
      `${request.nextUrl.origin}/api/auth/get-session`,
      {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch session:", response.statusText);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const session = await response.json();
    console.log("Session data:", session);

    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } */
}

export const config = {
  matcher: [
    /* "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)", */
    "/",
  ],
};
