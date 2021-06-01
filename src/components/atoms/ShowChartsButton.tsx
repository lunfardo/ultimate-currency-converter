import { IconButton, IconButtonProps } from "@material-ui/core";
import { TrendingUp } from "@material-ui/icons";

export const ShowChartsButton = (props: IconButtonProps) => {
  return (
    <IconButton
      {...props}
      style={{ background: "rgb(0 0 0 / 14%)" }}
      size="small"
    >
      <TrendingUp />
    </IconButton>
  );
};
