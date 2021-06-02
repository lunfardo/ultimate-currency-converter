import { useEffect, useState } from "react";
import { QueryFunction, useQuery } from "react-query";
import { format, isSaturday, isSunday, subDays } from "date-fns";

type HistoricalRates = {
  [date: string]: {
    [currencies: string]: {
      close: number;
    };
  };
};

type HistorialRates = {
  date: string;
  rate: number;
};

const fetchTimeSeries: QueryFunction = async ({ queryKey }) => {
  const firstCurrency = queryKey[1] as string;
  const secondCurrency = queryKey[2] as string;
  const convertionDate = queryKey[3] as Date;
  const currencies = [firstCurrency, secondCurrency].join("");

  let startDate = subDays(convertionDate, 60);
  let endDate = convertionDate;

  //This API doesnt work if the start_date or end_date is a weekend
  while (isSaturday(startDate) || isSunday(startDate)) {
    startDate = subDays(startDate, 1);
  }
  while (isSaturday(endDate) || isSunday(endDate)) {
    endDate = subDays(endDate, 1);
  }

  const response = await fetch(
    `https://fxmarketapi.com/apitimeseries?api_key=${
      process.env.REACT_APP_FXMARKET_API_KEY
    }&currency=${currencies}&start_date=${format(
      startDate,
      "yyyy-MM-dd"
    )}&end_date=${format(endDate, "yyyy-MM-dd")}`
  );
  return await response.json();
};

export const useTimeSeriesData = (
  firstCurrency: string,
  secondCurrency: string,
  convertionDate: Date
) => {
  const query = useQuery(
    [
      `rates-${firstCurrency}-${secondCurrency}-${convertionDate}`,
      firstCurrency,
      secondCurrency,
      convertionDate,
    ],
    fetchTimeSeries,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 60,
    }
  );
  const [data, setData] = useState<HistorialRates[] | null>(null);

  useEffect(() => {
    const data = query.data as Record<"price", HistoricalRates> | undefined;
    if (!data) {
      return;
    }
    const currencies = [firstCurrency, secondCurrency].join("");
    const newHistoricalData = Object.keys(data.price).map((date: string) => {
      return {
        date,
        rate: data.price[date][currencies]["close"],
      };
    });
    setData(newHistoricalData);
  }, [query.data, firstCurrency, secondCurrency]);

  return data;
};
