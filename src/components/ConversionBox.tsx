import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@material-ui/core";

import { memo, useEffect, useState } from "react";
import { CurrencySelector } from "./CurrencySelector";
import Alert from "@material-ui/lab/Alert";
import { OperandInput } from "./atoms/OperandInput";
import { useCurrencyConvertor } from "../hooks/useCurrencyConvertor";
import { OperationMode } from "../types";
import { OperationModeArrowIcon } from "./atoms/OperationModeArrowIcon";

import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { DatePicker } from "./atoms/DatePicker";
import { TrendingUp } from "@material-ui/icons";
import { DialogTimeSeries } from "./organisms/DialogTimeSeries";

export const ConversionBox: React.FC = memo(() => {
  const [leftOperand, setLeftOperand] = useState<string>();
  const [rightOperand, setRightOperand] = useState<string>();
  const [leftCurrency, setLeftCurrency] = useState<string>();
  const [rightCurrency, setRightCurrency] = useState<string>();
  const [convertionDate, setConvertionDate] = useState(new Date());
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);

  const [operationMode, setOperationMode] = useState<OperationMode>(
    OperationMode.Forward
  );
  const amount =
    operationMode === OperationMode.Forward ? leftOperand : rightOperand;
  const { result, withError } = useCurrencyConvertor(
    operationMode === OperationMode.Forward ? leftCurrency : rightCurrency,
    operationMode === OperationMode.Forward ? rightCurrency : leftCurrency,
    convertionDate,
    Number(amount)
  );
  const [printedResult, setPrintedResult] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

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
    setIsHistoryDialogOpen(false);
  };

  return (
    <>
      <div>
        <Box marginBottom={1} display="flex" alignContent="center">
          <DatePicker value={convertionDate} onChange={onDateChange} />
          <Box paddingLeft={2} marginTop={4}>
            <IconButton
              disabled={!leftCurrency || !rightCurrency}
              onClick={() => {
                setIsHistoryDialogOpen(true);
              }}
              style={{ background: "rgb(0 0 0 / 14%)" }}
              size="small"
            >
              <TrendingUp />
            </IconButton>
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
          operationMode={operationMode}
          DialogProps={{ onClose: onDialogClose, open: isHistoryDialogOpen }}
        />
      )}

      <Snackbar open={showAlert}>
        <Alert severity="error">Invalid input!</Alert>
      </Snackbar>
    </>
  );
});
