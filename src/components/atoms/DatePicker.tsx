import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from "@material-ui/pickers";

export const DatePicker = (props: KeyboardDatePickerProps) => {
  return (
    <KeyboardDatePicker
      {...props}
      disableToolbar
      autoOk={true}
      variant="inline"
      format="dd/MM/yyyy"
      margin="normal"
      maxDate={new Date()}
      id="date-picker-inline"
      label="Convertion Date"
    />
  );
};
