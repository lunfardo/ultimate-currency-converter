/* eslint-disable no-use-before-define */
import TextField from "@material-ui/core/TextField";
import Autocomplete, { AutocompleteProps } from "@material-ui/lab/Autocomplete";

import { useCurrenciesData } from "../../hooks/useCurrenciesData";
import { Currency } from "../../types";

export const CurrencySelector = (
  props: Partial<AutocompleteProps<Currency, false, false, false>>
) => {
  const currencies = useCurrenciesData();
  return (
    <Autocomplete
      {...props}
      style={{ width: 300 }}
      options={currencies ?? []}
      getOptionLabel={(option) => option.name}
      renderInput={(params: any) => (
        <TextField {...params} label="Choose a Currency" variant="outlined" />
      )}
    />
  );
};
