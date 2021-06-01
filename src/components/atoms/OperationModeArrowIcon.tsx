import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { green, red } from "@material-ui/core/colors";

import { OperationMode } from "../../types";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1.5),
  },
  withError: {
    color: red[600],
  },
  NoError: {
    color: green[600],
  },
}));

type OperationModeArrowIconProps = {
  operationMode: OperationMode;
  error: Boolean;
};
export const OperationModeArrowIcon: React.FC<OperationModeArrowIconProps> = ({
  operationMode,
  error,
}) => {
  const classes = useStyles(error);
  return (
    <div
      className={clsx(
        classes.root,
        error ? classes.withError : classes.NoError
      )}
    >
      {operationMode === OperationMode.Forward ? (
        <ArrowForward />
      ) : (
        <ArrowBack />
      )}
    </div>
  );
};
