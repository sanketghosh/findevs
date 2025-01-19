"use server";

import { UserSetCurrency } from "@prisma/client";
import { getSessionHandler } from "../_utils/get-session";
import { prisma } from "@/lib/prisma";
import { UserCurrencySetSchema } from "../_schemas/user-currency-set";

export async function setUserCurrencyAction(formData: FormData) {
  const value = formData.get("userCurrency");
  const parsedValues = UserCurrencySetSchema.parse({ userCurrency: value });

  const { id } = await getSessionHandler();

  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      userCurrency: parsedValues.userCurrency as UserSetCurrency,
    },
  });
}
