import { IconButton } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { OperationMode } from "../../types";

export const OperationModeArrowIcon: React.FC<{
  operationMode: OperationMode;
  error: Boolean;
}> = ({ operationMode, error }) => {
  return (
    <IconButton style={{ color: error ? "red" : "green" }}>
      {operationMode === OperationMode.Forward ? (
        <ArrowForward />
      ) : (
        <ArrowBack />
      )}
    </IconButton>
  );
};
