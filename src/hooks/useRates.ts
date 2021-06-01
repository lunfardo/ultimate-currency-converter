import { useEffect, useMemo, useState } from "react";
import { QueryFunction, useQuery } from "react-query";

type Rates = Record<string, number>;
type RatesPool = {[convertionPair: string]: Rates};

const API_KEY = "9b923c95528b39f1055b1e4187a62a58";

const fetchRates: QueryFunction = async ({ queryKey }) => {
  const currenciesMerged = queryKey[1] as string;
  if (!currenciesMerged) {
    return;
  }
  const response = await fetch(
    `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}&symbols=${currenciesMerged}`
  );
  return await response.json();
};

const getCurrenciesPairKey = (fromCurrency: string, toCurrency: string, sorted: boolean = false) => {
 const currencies = [fromCurrency, toCurrency]
 return sorted? currencies.sort().join(",") : currencies.join(",")
}

export const useRates = (fromCurrency?: string, toCurrency?:string): RatesPool | null => {
  const [ratesMap, setRatesMap] = useState<RatesPool | null>(null);
  const [ratesUniquePair,setRatesUniquePair] = useState<string>("");
  const query = useQuery(
    [`rates-${ratesUniquePair}`, ratesUniquePair],
    fetchRates,{
      refetchOnWindowFocus:false,
      refetchOnMount: false,
      staleTime:60
    }
  );

  useEffect(() => {
    if(!fromCurrency || !toCurrency) {
      return;
    }
    console.log("new key!")
    setRatesUniquePair(getCurrenciesPairKey(fromCurrency, toCurrency, true));
  },[fromCurrency, toCurrency])

  useEffect(() => {
    const currenciesPair = `${fromCurrency}-${toCurrency}`
    const data = query.data as Record<"rates",Rates>;
    console.log(data)
    if(!data) {
      return;
    }
    setRatesMap(ratesMap => ({...ratesMap, [currenciesPair]: data.rates as Rates  }))
  }, [query.data,fromCurrency,toCurrency])

  return useMemo(() => ratesMap, [ratesMap]);
};
