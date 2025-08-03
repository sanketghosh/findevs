import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  //you can pass client configuration here
  baseURL: "http://localhost:3000",
  plugins: [adminClient()],
});
