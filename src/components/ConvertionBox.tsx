import { Box, IconButton, TextField } from "@material-ui/core";

import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { useEffect, useState } from "react";
import { CurrencySelector } from "./CurrencySelector";

type ConvertionUnitProps = {
  index: number;
};

enum OperationMode {
  Forward = "forward", //left to right convertion operation
  Backward = "backward", //right to left convertion operation
}

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
  amount: number
): number => {
  const [result, setResult] = useState<number>(0);
  const { rates }: { rates: { [key: string]: number; EUR: number } } =
    apiResult;

  useEffect(() => {
    // setResult((rates[fromCurrency] * amount) / rates[toCurrency]);
    setResult(amount * 2);
  }, [amount, fromCurrency, toCurrency, rates]);

  return result;
};

export const ConvertionUnit = ({ index }: ConvertionUnitProps) => {
  const [leftOperand, setLeftOperand] = useState<number>(0);
  const [rightOperand, setRightOperand] = useState<number>(0);
  const [operationMode, setOperationMode] = useState<OperationMode>(
    OperationMode.Forward
  );
  const result = useCurrencyConvertor(
    operationMode === OperationMode.Forward ? "USD" : "EUR",
    operationMode === OperationMode.Forward ? "EUR" : "USD",
    operationMode === OperationMode.Forward ? leftOperand : rightOperand
  );

  useEffect(() => {
    if (operationMode === OperationMode.Forward) {
      setRightOperand(result);
    } else {
      setLeftOperand(result);
    }
  }, [result, operationMode]);

  return (
    <Box display="flex">
      <TextField
        value={leftOperand}
        variant="outlined"
        type="number"
        onChange={(event) => {
          setLeftOperand(Number(event.target.value));
        }}
        onKeyDown={() => {
          setOperationMode(OperationMode.Forward);
        }}
        // disabled={operationMode === OperationMode.Backward}
        aria-describedby={`box-${index}-first-convertion-value`}
        label={operationMode === OperationMode.Forward ? "From" : "To"}
      />
      <Box marginLeft={1}>
        <CurrencySelector />
      </Box>
      <Box marginLeft={1} marginRight={1}>
        <IconButton aria-label="forward-convertion-operation">
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
        value={rightOperand}
        variant="outlined"
        type="number"
        onChange={(event) => {
          setRightOperand(Number(event.target.value));
        }}
        onKeyDown={() => {
          setOperationMode(OperationMode.Backward);
        }}
        aria-describedby={`box-${index}-second-convertion-value`}
        label={operationMode === OperationMode.Forward ? "To" : "From"}
      />
    </Box>
  );
};
