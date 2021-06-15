import { memo } from "react";

import { IconButton, IconButtonProps } from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";

export const RemoveButton = memo((props: IconButtonProps) => {
  return (
    <IconButton
      {...props}
      color="secondary"
      aria-label="remove-convertion-box"
      size="small"
    >
      <RemoveCircle />
    </IconButton>
  );
});
