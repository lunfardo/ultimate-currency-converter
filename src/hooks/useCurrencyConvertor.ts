import { useState } from "react";
import { useDebounce } from "react-use";

const DEBOUNCE_DELAY_MS = 300;

const apiResult = {
  success: true,
  timestamp: 1622221034,
  base: "EUR",
  date: "2021-05-28",
  rates: {
    USD: 1.220308,
    EUR: 1,
  },
};

export const useCurrencyConvertor = (
  fromCurrency: string,
  toCurrency: string,
  amount?: number
): { result: number | null; withError: boolean } => {
  const [result, setResult] = useState<number | null>(null);
  const [withError, setWithError] = useState<boolean>(false);
  const { rates }: { rates: { [key: string]: number; EUR: number } } =
    apiResult;

  useDebounce(
    () => {
      if (!amount) {
        setWithError(true);
        return;
      }

      setResult((rates[toCurrency] * amount) / rates[fromCurrency]);
      setWithError(false);
    },
    DEBOUNCE_DELAY_MS,
    [amount, fromCurrency, toCurrency, rates]
  );

  return { result, withError };
};
