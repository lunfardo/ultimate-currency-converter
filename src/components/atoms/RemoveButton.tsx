import { memo } from "react";

import { IconButton, IconButtonProps } from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";

export const RemoveButton = memo(({ onClick, ...props }: IconButtonProps) => {
  return (
    <IconButton
      {...props}
      color="secondary"
      onClick={onClick}
      aria-label="remove-convertion-box"
      size="small"
    >
      <RemoveCircle />
    </IconButton>
  );
});
