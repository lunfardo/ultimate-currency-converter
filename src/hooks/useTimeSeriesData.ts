import { useEffect, useState } from "react";
import { QueryFunction, useQuery } from "react-query";
import { Rates } from "../types";

const exampple = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const API_KEY = "H89XCTMcishFM3lKnZKl";

type HistoricalRates = {
  [date: string]: {
    [currencies: string]: {
      close: number;
    };
  };
};

type HistorialRatios = {
  date: string;
  ratio: number;
};

const fetchTimeSeries: QueryFunction = async ({ queryKey }) => {
  const firstCurrency = queryKey[1] as string;
  const secondCurrency = queryKey[2] as string;
  const currencies = [firstCurrency, secondCurrency].join("");

  const response = await fetch(
    `https://fxmarketapi.com/apitimeseries?api_key=${API_KEY}&currency=${currencies}&start_date=2021-01-27&end_date=2021-06-01`
  );
  return await response.json();
};

export const useTimeSeriesData = (
  firstCurrency: string,
  secondCurrency: string
) => {
  const query = useQuery(
    [`rates-${firstCurrency}-${secondCurrency}`, firstCurrency, secondCurrency],
    fetchTimeSeries,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 60,
    }
  );
  const [data, setData] = useState<HistorialRatios[] | null>(null);

  useEffect(() => {
    const data = query.data as Record<"price", HistoricalRates> | undefined;
    if (!data) {
      return;
    }
    const currencies = [firstCurrency, secondCurrency].join("");
    const newHistoricalData = Object.keys(data.price).map((date: string) => {
      const dataBlock = data.price[date];
      return {
        date,
        ratio: dataBlock[currencies]["close"],
      };
    });

    setData(newHistoricalData);
  }, [query.data, firstCurrency, secondCurrency]);

  return data;
};
