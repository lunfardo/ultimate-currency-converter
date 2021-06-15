import { memo } from "react";

import { IconButton, IconButtonProps } from "@material-ui/core";
import { ControlPoint } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";

export const AddButton = memo((props: IconButtonProps) => {
  return (
    <IconButton
      {...props}
      style={{ color: green[600] }}
      aria-label="remove-convertion-box"
    >
      <ControlPoint />
    </IconButton>
  );
});
