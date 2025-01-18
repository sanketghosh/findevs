import { CURRENCIES_VALUES } from "@/app/(main)/_data";

// Conversion Function
export function convertCurrency(
  currentCurrencyId: string,
  currentValue: number,
  targetCurrencyId: string,
): number | string {
  const currentCurrency = CURRENCIES_VALUES.find(
    (currency) => currency.currencyId === currentCurrencyId,
  );
  const targetCurrency = CURRENCIES_VALUES.find(
    (currency) => currency.currencyId === targetCurrencyId,
  );

  if (!currentCurrency || !targetCurrency) {
    return "Invalid currency ID";
  }

  // Convert current currency value to USD
  const valueInUSD = currentValue * currentCurrency.valueInUSD;

  // Convert USD to target currency
  const convertedValue = valueInUSD / targetCurrency.valueInUSD;

  return parseFloat(convertedValue.toFixed(2)); // Rounded to 2 decimal places
}
