"use server";

// packages
import { UserSetCurrency } from "@prisma/client";

// local modules
import { getSessionHandler } from "@/app/(main)/_utils/get-session";
import { prisma } from "@/lib/prisma";
import { UserCurrencySetSchema } from "@/app/(main)/_schemas/user-currency-set";

/**

    @description Updates the current user's currency.
    @param {FormData} formData - The form data containing the new user currency.
    @throws {Error} If the form data is invalid or the user is not authenticated.
    @throws {Error} If updating the user's currency fails.
    */

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
