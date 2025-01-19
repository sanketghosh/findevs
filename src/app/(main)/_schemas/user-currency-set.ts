import { CURRENCY_CURRENT_VALUE } from "@/data/currency-current-value";
import { z } from "zod";

const CURRENCY_CURRENT_VALUE_IDS = CURRENCY_CURRENT_VALUE.map(
  (item) => item.currencyId,
);

export const UserCurrencySetSchema = z.object({
  userCurrency: z
    .string()
    .min(1)
    .refine((value) => CURRENCY_CURRENT_VALUE_IDS.includes(value), {
      message: "Currency must not be empty",
    }),
});

export type UserCurrencySetType = z.infer<typeof UserCurrencySetSchema>;

/* export const UserCurrencySetSchema = z.object({
  userCurrency: z
    .nativeEnum(UserSetCurrency)
    .refine((value) => !!value, { message: "Currency must not be empty" }),
}); */
