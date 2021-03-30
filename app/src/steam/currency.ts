export interface ICurrency {
  name: string;
  currencyId: number;
  parse: (value: string) => number;
}

function replaceAt(str: string, index: number, replacement: string) {
  return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

function replaceComma(str: string) {
  if (str[str.length - 3] == ',') {
    str = replaceAt(str, str.length - 3, '.');
  }
  // After replacing the cents comma, remove all other commas
  return str.replace(/[,.]/, '');
}

function replaceInvalid(str: string) {
  return str.split('-').join('0').split(' ').join('');
}

function currency(name: string, currencyId: number, /* [index at pos 0, index at last pos] */ [a, b]: number[]): ICurrency {
  return { name, currencyId, parse: (str: string) => Number(replaceComma(replaceInvalid(str.slice(a, str.length + b)))) };
}

export function getCurrency(id: number): ICurrency {
  for (let obj of Object.keys(CURRENCIES)) {
    const currency: ICurrency = CURRENCIES[obj];
    if (currency.currencyId === id) {
      return currency;
    }
  }
  return CURRENCIES.DEFAULT;
}

const CURRENCIES = {
  DEFAULT: currency('USD', 1, [1, 0]),
  USD: currency('USD', 1, [1, 0]),
  GBP: currency('GBP', 2, [1, 0]),
  EUR: currency('EUR', 3, [0, -1]),
  CHF: currency('CHF', 4, [4, 0]),
  BRL: currency('BRL', 7, [3, 0])
};

export default CURRENCIES;

// TODO: Create all currencies.
//
// In some DoctorMcKay node-steam-* repo I saw a complete implementation
// https://github.com/DoctorMcKay 
//
// Here are all steam codes:
//
// - USD = 1, ✓
// - GBP = 2, ✓
// - EUR = 3, ✓
// - CHF = 4, ✓
// - RUB = 5,
// - PLN = 6,
// - BRL = 7, ✓
// - JPY = 8,
// - NOK = 9,
// - IDR = 10,
// - MYR = 11,
// - PHP = 12,
// - SGD = 13,
// - THB = 14,
// - VND = 15,
// - KRW = 16,
// - TRY = 17,
// - UAH = 18,
// - MXN = 19,
// - CAD = 20,
// - AUD = 21,
// - NZD = 22,
// - CNY = 23,
// - INR = 24,
// - CLP = 25,
// - PEN = 26,
// - COP = 27,
// - ZAR = 28,
// - HKD = 29,
// - TWD = 30,
// - SAR = 31,
// - AED = 32,
// - ARS = 34,
// - ILS = 35,
// - vBYN = 36,
// - KZT = 37,
// - KWD = 38,
// - QAR = 39,
// - CRC = 40,
// - UYU = 41

