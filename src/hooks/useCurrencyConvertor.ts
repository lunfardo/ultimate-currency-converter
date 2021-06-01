import { useState } from "react";
import { useDebounce } from "react-use";
import { useRates } from "./useRates";

const DEBOUNCE_DELAY_MS = 300;

export const useCurrencyConvertor = (
  fromCurrency?: string,
  toCurrency?: string,
  convertionDate?: Date,
  amount?: number
): { result: number | null; withError: boolean } => {
  const [result, setResult] = useState<number | null>(null);
  const [withError, setWithError] = useState<boolean>(false);
  const ratesPool = useRates(fromCurrency, toCurrency, convertionDate);

  useDebounce(
    () => {
      if (!ratesPool) {
        return;
      }
      const rates = ratesPool[`${fromCurrency}-${toCurrency}`];
      if (!amount) {
        setWithError(true);
        return;
      }

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
