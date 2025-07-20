import { getSessionHandler } from "@/app/(main)/_utils/get-session";
import { prisma } from "@/lib/prisma";

export async function isAdmin() {
  const { email, id } = await getSessionHandler();

  // test
  const admin = await prisma?.user.findFirst({
    select: {
      id: true,
      email: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  // console.log("@@@ADMIN??: ", admin?.email);

  if (email === admin?.email && id === admin?.id) {
    return true;
  } else {
    return false;
  }
}
