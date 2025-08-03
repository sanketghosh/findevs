import { prisma } from "@/lib/prisma";

const user = await prisma.user.findFirst({
  select: {
    id: true,
    email: true,
  },
  orderBy: {
    id: "asc",
  },
});

export function getFirstUser() {
  return {
    firstUserId: user?.id,
    FirstUserEmail: user?.email,
  };
}
