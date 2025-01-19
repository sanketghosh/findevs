import { getSessionHandler } from "@/app/(main)/_utils/get-session";

export async function isAdmin() {
  const { email, id } = await getSessionHandler();
  if (email === "sarah@mail.com" && id === "RGIlWXTfYnoNEbqvkm8zY3MUNSSzg1RY") {
    return true;
  } else {
    return false;
  }
}
