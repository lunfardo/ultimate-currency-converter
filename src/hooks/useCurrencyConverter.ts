import { useState } from "react";
import { useDebounce } from "react-use";

import { useRatesData } from "./useRatesData";

const DEBOUNCE_DELAY_MS = 300;

export const useCurrencyConverter = (
  fromCurrency: string,
  toCurrency: string,
  convertionDate: Date,
  amount: number
): { result: number | null; withError: boolean } => {
  const [result, setResult] = useState<number | null>(null);
  const [withError, setWithError] = useState<boolean>(false);
  const ratesPool = useRatesData(fromCurrency, toCurrency, convertionDate);

  useDebounce(
    () => {
      if (!amount) {
        setWithError(true);
        return;
      }

      if (!ratesPool) {
        return;
      }

      const rates = ratesPool[`${fromCurrency}-${toCurrency}`];

      if (!rates || !toCurrency || !fromCurrency) {
        return;
      }
      setResult((rates[toCurrency] * amount) / rates[fromCurrency]);
      setWithError(false);
    },
    DEBOUNCE_DELAY_MS,
    [amount, fromCurrency, toCurrency, ratesPool]
  );

  return { result, withError };
};
