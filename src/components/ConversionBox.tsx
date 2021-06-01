import { Box, Snackbar } from "@material-ui/core";

import { memo, useEffect, useState } from "react";
import { CurrencySelector } from "./CurrencySelector";
import Alert from "@material-ui/lab/Alert";
import { OperandInput } from "./atoms/OperandInput";
import { useCurrencyConvertor } from "../hooks/useCurrencyConvertor";
import { OperationMode } from "../types";
import { OperationModeArrowIcon } from "./atoms/OperationModeArrowIcon";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

export const ConversionBox: React.FC = memo(() => {
  const [leftOperand, setLeftOperand] = useState<string>();
  const [rightOperand, setRightOperand] = useState<string>();
  const [leftCurrency, setLeftCurrency] = useState<string>();
  const [rightCurrency, setRightCurrency] = useState<string>();
  const [convertionDate, setConvertionDate] = useState(new Date());

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
  const handleDateChange = (date: MaterialUiPickersDate) => {
    setConvertionDate(date as Date);
  };

  return (
    <>
      <div>
        <Box marginBottom={1}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              autoOk={true}
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              maxDate={new Date()}
              id="date-picker-inline"
              label="Date picker inline"
              value={convertionDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
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
      <Snackbar open={showAlert}>
        <Alert severity="error">Invalid input!</Alert>
      </Snackbar>
    </>
  );
});
