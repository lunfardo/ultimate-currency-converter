import { memo, useEffect, useState } from "react";

import { Box, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import { OperandInput } from "../atoms/OperandInput";
import { OperationModeArrowIcon } from "../atoms/OperationModeArrowIcon";
import { CurrencySelector } from "../atoms/CurrencySelector";
import { DatePicker } from "../atoms/DatePicker";
import { ShowChartsButton } from "../atoms/ShowChartsButton";
import { DialogTimeSeries } from "../organisms/DialogTimeSeries";
import { useCurrencyConverter } from "../../hooks/useCurrencyConverter";
import { OperationMode } from "../../types";

export const ConversionBox: React.FC = memo(() => {
  const [leftOperand, setLeftOperand] = useState<string>();
  const [rightOperand, setRightOperand] = useState<string>();
  const [leftCurrency, setLeftCurrency] = useState<string>();
  const [rightCurrency, setRightCurrency] = useState<string>();
  const [convertionDate, setConvertionDate] = useState(new Date());
  const [isHistoricalDialogOpen, setIsHistoricalDialogOpen] = useState(false);
  const [printedResult, setPrintedResult] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [operationMode, setOperationMode] = useState(OperationMode.Forward);

  const amount = getSourceAmount(leftOperand, rightOperand, operationMode);
  const { result, withError } = useCurrencyConverter(
    getSourceCurrency(leftCurrency, rightCurrency, operationMode),
    getGoalCurrency(leftCurrency, rightCurrency, operationMode),
    convertionDate,
    Number(amount)
  );

  useEffect(() => {
    setPrintedResult(result);
  }, [result]);

  //Assign result value according to the operation mode
  useEffect(() => {
    if (!printedResult) {
      return;
    }
    const fixedResult = printedResult.toFixed(3);
    if (operationMode === OperationMode.Forward) {
      setRightOperand(fixedResult);
    } else {
      setLeftOperand(fixedResult);
    }
  }, [printedResult, operationMode]);

  //Check for inputs errors (ignore them if any operand was cleaned up)
  useEffect(() => {
    if (!leftOperand || !rightOperand) {
      setShowAlert(false);
      return;
    }
    if (withError) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [withError, leftOperand, rightOperand]);

  const onDateChange = (date: MaterialUiPickersDate) => {
    setConvertionDate(date as Date);
  };

  const onDialogClose = () => {
    setIsHistoricalDialogOpen(false);
  };

  return (
    <>
      <div>
        <Box marginBottom={1} display="flex" alignContent="center">
          <DatePicker value={convertionDate} onChange={onDateChange} />
          <Box paddingLeft={2} marginTop={4}>
            <ShowChartsButton
              disabled={!leftCurrency || !rightCurrency}
              onClick={() => {
                setIsHistoricalDialogOpen(true);
              }}
            />
          </Box>
        </Box>

        <Box display="flex">
          {/* LEFT  OPERAND */}
          <OperandInput
            error={showAlert}
            value={leftOperand ?? ""}
            onChange={(event) => {
              setLeftOperand(event.target.value);
            }}
            onKeyDown={() => {
              setPrintedResult(null);
              setOperationMode(OperationMode.Forward);
            }}
            label={operationMode === OperationMode.Forward ? "From" : "To"}
          />
          <Box marginLeft={1}>
            <CurrencySelector
              onChange={(event, value) => {
                setLeftCurrency(value ?? "");
              }}
            />
          </Box>
          {/**/}

          <Box marginLeft={1} marginRight={1}>
            <OperationModeArrowIcon
              error={showAlert}
              operationMode={operationMode}
            />
          </Box>

          {/* RIGHT  OPERAND */}
          <Box marginRight={1}>
            <CurrencySelector
              onChange={(event, value) => {
                setRightCurrency(value ?? "");
              }}
            />
          </Box>
          <OperandInput
            error={showAlert}
            value={rightOperand ?? ""}
            onChange={(event) => {
              setRightOperand(event.target.value);
            }}
            onKeyDown={() => {
              setPrintedResult(null);
              setOperationMode(OperationMode.Backward);
            }}
            label={operationMode === OperationMode.Forward ? "To" : "From"}
          />
          {/**/}
        </Box>
      </div>

      {!!leftCurrency && !!rightCurrency && (
        <DialogTimeSeries
          leftCurrency={leftCurrency}
          rightCurrency={rightCurrency}
          convertionDate={convertionDate}
          operationMode={operationMode}
          DialogProps={{ open: isHistoricalDialogOpen, onClose: onDialogClose }}
        />
      )}

      <Snackbar open={showAlert}>
        <Alert severity="error">Invalid amount!</Alert>
      </Snackbar>
    </>
  );
});

const getSourceAmount = (
  leftOperand?: string,
  rightOperand?: string,
  operationMode?: OperationMode
) => (operationMode === OperationMode.Forward ? leftOperand : rightOperand);

const getSourceCurrency = (
  leftCurrency?: string,
  rightCurrency?: string,
  operationMode?: OperationMode
) => (operationMode === OperationMode.Forward ? leftCurrency : rightCurrency);

const getGoalCurrency = (
  leftCurrency?: string,
  rightCurrency?: string,
  operationMode?: OperationMode
) => (operationMode === OperationMode.Forward ? rightCurrency : leftCurrency);
