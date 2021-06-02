import { Box } from "@material-ui/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTimeSeriesData } from "../hooks/useTimeSeriesData";

type TimeSeriesChartProps = {
  firstCurrency: string;
  secondCurrency: string;
  convertionDate: Date;
};
export const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  firstCurrency,
  secondCurrency,
  convertionDate,
}) => {
  const data = useTimeSeriesData(firstCurrency, secondCurrency, convertionDate);

  if (!data) {
    return null;
  }

  return (
    <Box height="400px">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="rate"
            name={`${firstCurrency}-${secondCurrency} Rate`}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
