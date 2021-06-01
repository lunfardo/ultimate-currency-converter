/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { AutocompleteProps } from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import currencies from "../currencies.json";
import { SelectProps } from "@material-ui/core";
import { UseAutocompleteProps } from "@material-ui/lab";

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode: any) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char: any) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

export const CurrencySelector = ({
  ...props
}: Partial<AutocompleteProps<string, false, false, false>>) => {
  return (
    <Autocomplete
      style={{ width: 300 }}
      {...props}
      options={Object.keys(currencies)}
      renderInput={(params: any) => (
        <TextField {...params} label="Choose a Currency" variant="outlined" />
      )}
    />
  );
};