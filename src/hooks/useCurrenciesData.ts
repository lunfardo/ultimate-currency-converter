import { useEffect, useMemo, useState } from "react";
import { QueryFunction, useQuery } from "react-query";

import { Currency } from "../types";

type CurrenciesAPIFormat = Record<string, string>;

const fetchCurrencies: QueryFunction = async () => {
  const response = await fetch(
    `https://openexchangerates.org/api/currencies.json`
  );
  return await response.json();
};

export const useCurrenciesData = (): Currency[] | null => {
  const [currencies, setCurrencies] = useState<Currency[] | null>(null);
  const query = useQuery("currencies", fetchCurrencies, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 60,
  });

  useEffect(() => {
    const data = query.data as CurrenciesAPIFormat | undefined;

    if (!data) {
      return;
    }

    const parsedCurrencies = Object.keys(data).map((currencyKey) => ({
      key: currencyKey,
      name: data[currencyKey],
    }));

    setCurrencies(parsedCurrencies);
  }, [query.data]);

  return useMemo(() => currencies, [currencies]);
};
