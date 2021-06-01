import { useEffect, useMemo, useState } from "react";
import { QueryFunction, useQuery } from "react-query";
import { format, isEqual } from "date-fns";
import { Rates } from "../types";

type RatesPool = { [convertionPair: string]: Rates };

// const API_KEY = "9b923c95528b39f1055b1e4187a62a58";
const API_KEY = "c266944752f24393afe3cf6f9fde2f3a";

const fetchRates: QueryFunction = async ({ queryKey }) => {
  const currenciesMerged = queryKey[1] as string;
  const convertionDate = queryKey[2] as Date;
  if (!currenciesMerged) {
    return;
  }
  const today = new Date();

  const endpoint = isEqual(convertionDate, today)
    ? `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}&symbols=${currenciesMerged}`
    : `https://openexchangerates.org/api/historical/${format(
        convertionDate,
        "yyyy-MM-dd"
      )}.json?app_id=${API_KEY}&symbols=${currenciesMerged}`;

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
  fromCurrency?: string,
  toCurrency?: string,
  convertionDate?: Date
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
