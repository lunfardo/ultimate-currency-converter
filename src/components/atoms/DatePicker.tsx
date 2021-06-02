import { subYears } from "date-fns";
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
      minDate={subYears(new Date(), 10)}
      id="date-picker-inline"
      label="Convertion Date"
    />
  );
};
