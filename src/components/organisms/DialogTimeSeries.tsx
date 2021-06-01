import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@material-ui/core";
import { TimeSeriesChart } from "../../molecules/TimeSeriesChart";
import { OperationMode } from "../../types";

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
  const firstCurrency =
    operationMode === OperationMode.Forward ? leftCurrency : rightCurrency;
  const secondCurrency =
    operationMode === OperationMode.Forward ? rightCurrency : leftCurrency;
  return (
    <Dialog
      fullScreen
      aria-labelledby="currency-history-dialog"
      {...DialogProps}
    >
      <DialogTitle id="customized-dialog-title">
        {`Convertion Historical Data: ${firstCurrency} - ${secondCurrency} (last 60 days)`}
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
