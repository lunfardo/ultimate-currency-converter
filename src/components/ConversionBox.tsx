import { Box, Snackbar } from "@material-ui/core";

import { memo, useEffect, useState } from "react";
import { CurrencySelector } from "./CurrencySelector";
import Alert from "@material-ui/lab/Alert";
import { OperandInput } from "./atoms/OperandInput";
import { useCurrencyConvertor } from "../hooks/useCurrencyConvertor";
import { OperationMode } from "../types";
import { OperationModeArrowIcon } from "./atoms/OperationModeArrowIcon";

export const ConversionBox: React.FC = memo(() => {
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

  //Assign result value according to the operation mode
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

  //Check for inputs errors (ignore them if any operand was cleaned up)
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
    <>
      <Box display="flex">
        {/* LEFT  OPERAND */}
        <OperandInput
          error={showAlert}
          value={leftOperand}
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
        {/**/}

        <Box marginLeft={1} marginRight={1}>
          <OperationModeArrowIcon
            error={withError}
            operationMode={operationMode}
          />
        </Box>

        {/* RIGHT  OPERAND */}
        <Box marginRight={1}>
          <CurrencySelector />
        </Box>
        <OperandInput
          error={showAlert}
          value={rightOperand}
          onChange={(event) => {
            setRightOperand(event.target.value);
          }}
          onKeyDown={() => {
            setOperationMode(OperationMode.Backward);
          }}
          label={operationMode === OperationMode.Forward ? "To" : "From"}
        />
        {/**/}
      </Box>

      <Snackbar open={showAlert}>
        <Alert severity="error">Invalid input!</Alert>
      </Snackbar>
    </>
  );
});
