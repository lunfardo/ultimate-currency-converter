import { OperationMode } from "./types";

export const getSourceAmount = (
  leftOperand: string,
  rightOperand: string,
  operationMode: OperationMode
) => (operationMode === OperationMode.Forward ? leftOperand : rightOperand);

export const getSourceCurrency = (
  leftCurrency: string,
  rightCurrency: string,
  operationMode: OperationMode
) => (operationMode === OperationMode.Forward ? leftCurrency : rightCurrency);

export const getGoalCurrency = (
  leftCurrency: string,
  rightCurrency: string,
  operationMode: OperationMode
) => (operationMode === OperationMode.Forward ? rightCurrency : leftCurrency);
