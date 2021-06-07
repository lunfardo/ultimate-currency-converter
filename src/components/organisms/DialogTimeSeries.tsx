import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@material-ui/core";
import { TimeSeriesChart } from "../molecules/TimeSeriesChart";
import { OperationMode } from "../../types";
import { getGoalCurrency, getSourceCurrency } from "../../utils";

type DialogTimeSeriesProps = {
  DialogProps: DialogProps;
  leftCurrency: string;
  rightCurrency: string;
  operationMode: OperationMode;
  convertionDate: Date;
};
export const DialogTimeSeries: React.FC<DialogTimeSeriesProps> = ({
  DialogProps,
  leftCurrency,
  rightCurrency,
  operationMode,
  convertionDate,
}) => {
  const firstCurrency = getSourceCurrency(
    leftCurrency,
    rightCurrency,
    operationMode
  );
  const secondCurrency = getGoalCurrency(
    leftCurrency,
    rightCurrency,
    operationMode
  );
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      aria-labelledby="currency-history-dialog"
      {...DialogProps}
    >
      <DialogTitle id="customized-dialog-title">
        {`Historical ${firstCurrency}-${secondCurrency} Rates (60 days previous to convertion date, no weekends)`}
      </DialogTitle>
      <DialogContent>
        <TimeSeriesChart
          firstCurrency={firstCurrency}
          secondCurrency={secondCurrency}
          convertionDate={convertionDate}
        />
      </DialogContent>
    </Dialog>
  );
};
