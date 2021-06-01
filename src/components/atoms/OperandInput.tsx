import { TextField, TextFieldProps } from "@material-ui/core";

export const OperandInput = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
    />
  );
};
