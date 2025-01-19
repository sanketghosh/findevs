const RATES = `
    "AED": 3.673,
    "AFN": 73.382385,
    "ALL": 95.367972,
    "AMD": 401.079394,
    "ANG": 1.802722,
    "AOA": 913.666667,
    "ARS": 1041.21411,
    "AUD": 1.614987,
    "AWG": 1.8025,
    "AZN": 1.7,
    "BAM": 1.89843,
    "BBD": 2,
    "BDT": 121.510021,
    "BGN": 1.897822,
    "BHD": 0.376886,
    "BIF": 2959.568012,
    "BMD": 1,
    "BND": 1.366976,
    "BOB": 6.912116,
    "BRL": 6.107116,
    "BSD": 1,
    "BTC": 0.000009528347,
    "BTN": 86.593269,
    "BWP": 13.970803,
    "BYN": 3.273541,
    "BZD": 2.00928,
    "CAD": 1.44815,
    "CDF": 2850.874193,
    "CHF": 0.915396,
    "CLF": 0.036742,
    "CLP": 1013.817865,
    "CNH": 7.34205,
    "CNY": 7.325,
    "COP": 4361.071936,
    "CRC": 501.446576,
    "CUC": 1,
    "CUP": 25.75,
    "CVE": 107.625,
    "CZK": 24.6,
    "DJF": 177.5,
    "DKK": 7.2656,
    "DOP": 61.55,
    "DZD": 135.629758,
    "EGP": 50.224637,
    "ERN": 15,
    "ETB": 125.283295,
    "EUR": 0.97371,
    "FJD": 2.33,
    "FKP": 0.821794,
    "GBP": 0.821794,
    "GEL": 2.84,
    "GGP": 0.821794,
    "GHS": 14.904583,
    "GIP": 0.821794,
    "GMD": 71,
    "GNF": 8650,
    "GTQ": 7.722547,
    "GYD": 209.27564,
    "HKD": 7.7859,
    "HNL": 25.445544,
    "HRK": 7.33516,
    "HTG": 130.583744,
    "HUF": 400.75676,
    "IDR": 16383.1,
    "ILS": 3.59769,
    "IMP": 0.821794,
    "INR": 86.58475,
    "IQD": 1310.110151,
    "IRR": 42087.5,
    "ISK": 140.798573,
    "JEP": 0.821794,
    "JMD": 158.043896,
    "JOD": 0.7091,
    "JPY": 156.285,
    "KES": 129.52,
    "KGS": 87.45,
    "KHR": 4038.924113,
    "KMF": 478.449932,
    "KPW": 900,
    "KRW": 1457.815818,
    "KWD": 0.308573,
    "KYD": 0.833608,
    "KZT": 530.64897,
    "LAK": 21822.011789,
    "LBP": 89570.624635,
    "LKR": 296.524957,
    "LRD": 189.99563,
    "LSL": 18.907362,
    "LYD": 4.945594,
    "MAD": 10.046092,
    "MDL": 18.641152,
    "MGA": 4689.286488,
    "MKD": 59.880791,
    "MMK": 2098,
    "MNT": 3398,
    "MOP": 8.022364,
    "MRU": 39.741798,
    "MUR": 46.909998,
    "MVR": 15.395,
    "MWK": 1734.488807,
    "MXN": 20.791,
    "MYR": 4.506,
    "MZN": 63.909994,
    "NAD": 18.79,
    "NGN": 1558.67,
    "NIO": 36.799456,
    "NOK": 11.4494,
    "NPR": 138.54963,
    "NZD": 1.790992,
    "OMR": 0.38365,
    "PAB": 1,
    "PEN": 3.758843,
    "PGK": 4.068142,
    "PHP": 58.552994,
    "PKR": 278.774263,
    "PLN": 4.135462,
    "PYG": 7880.048226,
    "QAR": 3.647544,
    "RON": 4.8454,
    "RSD": 114.026,
    "RUB": 102.469562,
    "RWF": 1393.102106,
    "SAR": 3.745487,
    "SBD": 8.468008,
    "SCR": 15.022619,
    "SDG": 601,
    "SEK": 11.1937,
    "SGD": 1.3686,
    "SHP": 0.821794,
    "SLL": 20969.5,
    "SOS": 571.625559,
    "SRD": 35.105,
    "SSP": 130.26,
    "STD": 22281.8,
    "STN": 23.781328,
    "SVC": 8.750546,
    "SYP": 13002,
    "SZL": 18.865961,
    "THB": 34.390373,
    "TJS": 10.918154,
    "TMT": 3.51,
    "TND": 3.21776,
    "TOP": 2.44088,
    "TRY": 35.4332,
    "TTD": 6.791687,
    "TWD": 32.8935,
    "TZS": 2529.915325,
    "UAH": 42.115878,
    "UGX": 3685.605741,
    "USD": 1,
    "UYU": 44.000478,
    "UZS": 12971.184603,
    "VES": 54.843047,
    "VND": 25329.22851,
    "VUV": 118.722,
    "WST": 2.8,
    "XAF": 638.711788,
    "XAG": 0.03289233,
    "XAU": 0.00037007,
    "XCD": 2.70255,
    "XDR": 0.770993,
    "XOF": 638.711788,
    "XPD": 0.00104005,
    "XPF": 116.194492,
    "XPT": 0.00105007,
    "YER": 249.099998,
    "ZAR": 18.7515,
    "ZMW": 27.783385,
    "ZWL": 322
`;

function generateCurrencyEnum(ratesString: string): string {
  // Remove unnecessary characters and split the string into an array of key-value pairs
  const ratesArray = ratesString.replace(/\s+/g, "").split(",");

  // Initialize an empty array to store the currency enum values
  const enumValues: string[] = [];

  // Iterate over each key-value pair in the array
  ratesArray.forEach((rate) => {
    // Split the key-value pair into an array of two elements
    const [key] = rate.split(":");

    // Remove the quotes from the key
    const currencyId = key.replace(/"/g, "");

    // Add the currency to the enum values
    enumValues.push(currencyId);
  });

  // Return the enum as a string
  return `enum UserSetCurrency {\n${enumValues.join("\n")}\n}`;
}
const parsedRates = generateCurrencyEnum(RATES);
console.log(parsedRates);