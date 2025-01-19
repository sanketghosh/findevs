import { CURRENCY_CURRENT_VALUE } from "@/data/currency-current-value";

export function convertCurrency(
  fromCurrencyId: string,
  toCurrencyId: string,
  amount: number,
): number {
  const fromCurrency = CURRENCY_CURRENT_VALUE.find(
    (currency) => currency.currencyId === fromCurrencyId,
  );
  const toCurrency = CURRENCY_CURRENT_VALUE.find(
    (currency) => currency.currencyId === toCurrencyId,
  );

  if (!fromCurrency || !toCurrency) {
    throw new Error("Invalid currency ID provided.");
  }

  // Convert the amount to USD (base currency)
  const amountInUSD = amount / fromCurrency.value;

  // Convert the USD amount to the target currency
  const convertedAmount = amountInUSD * toCurrency.value;

  return convertedAmount;
}

/* // Example usage:
const amount = 2; // Amount in the "fromCurrency"
const fromCurrency = "EUR"; // Current currency
const toCurrency = "USD"; // Target currency

const convertedAmount = convertCurrency(fromCurrency, toCurrency, amount);
console.log(
  `${amount} ${fromCurrency} is approximately ${convertedAmount.toFixed(2)} ${toCurrency}`,
); */
