import { Box, IconButton, Snackbar, TextField } from "@material-ui/core";

import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { memo, useEffect, useState } from "react";
import { CurrencySelector } from "./CurrencySelector";
import { useDebounce } from "react-use";
import Alert from "@material-ui/lab/Alert";

enum OperationMode {
  Forward = "forward", //left to right convertion operation
  Backward = "backward", //right to left convertion operation
}

const DEBOUNCE_DELAY_MS = 300;

const apiResult = {
  success: true,
  timestamp: 1622221034,
  base: "EUR",
  date: "2021-05-28",
  rates: {
    USD: 1.220308,
    EUR: 1,
  },
};

const useCurrencyConvertor = (
  fromCurrency: string,
  toCurrency: string,
  amount?: number
): { result: number | null; withError: boolean } => {
  const [result, setResult] = useState<number | null>(null);
  const [withError, setWithError] = useState<boolean>(false);
  const { rates }: { rates: { [key: string]: number; EUR: number } } =
    apiResult;

  useDebounce(
    () => {
      if (!amount) {
        setWithError(true);
        return;
      }

      setResult((rates[toCurrency] * amount) / rates[fromCurrency]);
      setWithError(false);
    },
    DEBOUNCE_DELAY_MS,
    [amount, fromCurrency, toCurrency, rates]
  );

  return { result, withError };
};

export const ConversionBox = memo(() => {
  const [leftOperand, setLeftOperand] = useState<string>();
  const [rightOperand, setRightOperand] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [operationMode, setOperationMode] = useState<OperationMode>(
    OperationMode.Forward
  );
  const amount =
    operationMode === OperationMode.Forward ? leftOperand : rightOperand;
  const { result, withError } = useCurrencyConvertor(
    operationMode === OperationMode.Forward ? "USD" : "EUR",
    operationMode === OperationMode.Forward ? "EUR" : "USD",
    Number(amount)
  );

  useEffect(() => {
    if (!result) {
      return;
    }
    const parsedResult = result.toFixed(3);
    if (operationMode === OperationMode.Forward) {
      setRightOperand(parsedResult);
    } else {
      setLeftOperand(parsedResult);
    }
  }, [result, operationMode]);

  useEffect(() => {
    const someEmptyValue = !leftOperand || !rightOperand;
    if (someEmptyValue) {
      setShowAlert(false);
      return;
    }
    if (withError) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [withError, leftOperand, rightOperand]);

  return (
    <Box display="flex">
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        error={showAlert}
        value={leftOperand}
        variant="outlined"
        onChange={(event) => {
          setLeftOperand(event.target.value);
        }}
        onKeyDown={() => {
          setOperationMode(OperationMode.Forward);
        }}
        label={operationMode === OperationMode.Forward ? "From" : "To"}
      />
      <Box marginLeft={1}>
        <CurrencySelector />
      </Box>

      <Snackbar open={showAlert}>
        <Alert severity="error">Invalid input!</Alert>
      </Snackbar>

      <Box marginLeft={1} marginRight={1}>
        <IconButton style={{ color: withError ? "red" : "green" }}>
          {operationMode === OperationMode.Forward ? (
            <ArrowForward />
          ) : (
            <ArrowBack />
          )}
        </IconButton>
      </Box>

      <Box marginRight={1}>
        <CurrencySelector />
      </Box>
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        error={showAlert}
        value={rightOperand}
        variant="outlined"
        onChange={(event) => {
          setRightOperand(event.target.value);
        }}
        onKeyDown={() => {
          setOperationMode(OperationMode.Backward);
        }}
        label={operationMode === OperationMode.Forward ? "To" : "From"}
      />
    </Box>
  );
});
