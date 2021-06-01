import { makeStyles, Theme } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { OperationMode } from "../../types";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1.5),
  },
  withError: {
    color: "red",
  },
  NoError: {
    color: "green",
  },
}));

export const OperationModeArrowIcon: React.FC<{
  operationMode: OperationMode;
  error: Boolean;
}> = ({ operationMode, error }) => {
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
