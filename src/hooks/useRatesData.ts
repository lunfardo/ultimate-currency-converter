import { useEffect, useMemo, useState } from "react";
import { QueryFunction, useQuery } from "react-query";
import { format, isSameDay, isValid } from "date-fns";

import { Rates } from "../types";

type RatesPool = { [convertionPair: string]: Rates };

const fetchRates: QueryFunction = async ({ queryKey }) => {
  const currenciesMerged = queryKey[1] as string;
  const convertionDate = queryKey[2] as Date;
  if (!currenciesMerged) {
    return;
  }
  if (!isValid(convertionDate)) {
    return;
  }
  const today = new Date();
  const endpoint = isSameDay(convertionDate, today)
    ? `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_OPENEXCHANGE_API_KEY}&symbols=${currenciesMerged}`
    : `https://openexchangerates.org/api/historical/${format(
        convertionDate,
        "yyyy-MM-dd"
      )}.json?app_id=${
        process.env.REACT_APP_OPENEXCHANGE_API_KEY
      }&symbols=${currenciesMerged}`;

  const response = await fetch(endpoint);
  return await response.json();
};

const getCurrenciesPairKey = (
  fromCurrency: string,
  toCurrency: string,
  sorted: boolean = false
) => {
  const currencies = [fromCurrency, toCurrency];
  return sorted ? currencies.sort().join(",") : currencies.join(",");
};

export const useRatesData = (
  fromCurrency: string,
  toCurrency: string,
  convertionDate: Date
): RatesPool | null => {
  const [ratesMap, setRatesMap] = useState<RatesPool | null>(null);
  const [ratesUniquePair, setRatesUniquePair] = useState<string>("");
  const query = useQuery(
    [
      `rates-${ratesUniquePair}-${convertionDate}`,
      ratesUniquePair,
      convertionDate,
    ],
    fetchRates,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 60,
    }
  );

  useEffect(() => {
    if (!fromCurrency || !toCurrency) {
      return;
    }
    setRatesUniquePair(getCurrenciesPairKey(fromCurrency, toCurrency, true));
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    const currenciesPair = `${fromCurrency}-${toCurrency}`;
    const data = query.data as Record<"rates", Rates> | undefined;

    if (!data) {
      return;
    }

    setRatesMap((ratesMap) => ({ ...ratesMap, [currenciesPair]: data.rates }));
  }, [query.data, fromCurrency, toCurrency]);

  return useMemo(() => ratesMap, [ratesMap]);
};
