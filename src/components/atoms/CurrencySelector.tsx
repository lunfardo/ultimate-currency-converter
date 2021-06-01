/* eslint-disable no-use-before-define */
import TextField from "@material-ui/core/TextField";
import Autocomplete, { AutocompleteProps } from "@material-ui/lab/Autocomplete";
import currencies from "../../currencies.json";

export const CurrencySelector = (
  props: Partial<AutocompleteProps<string, false, false, false>>
) => {
  return (
    <Autocomplete
      {...props}
      style={{ width: 300 }}
      options={Object.keys(currencies)}
      renderInput={(params: any) => (
        <TextField {...params} label="Choose a Currency" variant="outlined" />
      )}
    />
  );
};
