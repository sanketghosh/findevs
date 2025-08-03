import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  //you can pass client configuration here
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [adminClient()],
});
