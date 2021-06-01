import { memo, useState } from "react";

import { Box, Divider, IconButton, IconButtonProps } from "@material-ui/core";
import { ControlPoint, RemoveCircle } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";

import { ConversionBox } from "../templates/ConversionBox";

export const CurrenciesConverter = () => {
  const [conversionBoxIndexes, setConversionBoxIndexes] = useState<number[]>([
    0, //at least 1 box
  ]);
  const isThereMoreThanOneBox = conversionBoxIndexes.length > 1;

  const addConversionBox = () => {
    setConversionBoxIndexes((conversionBoxIndexes) => [
      ...conversionBoxIndexes,
      conversionBoxIndexes[conversionBoxIndexes.length - 1] + 1,
    ]);
  };

  const removeConversionBox = (indexToRemove: number) => () => {
    setConversionBoxIndexes((conversionBoxIndexes) =>
      conversionBoxIndexes.filter((index) => index !== indexToRemove)
    );
  };

  return (
    <Box margin="auto" padding={10} width="max-content">
      {conversionBoxIndexes.map((convertionBoxIndex, index) => (
        <>
          <Box
            key={convertionBoxIndex}
            paddingTop={1}
            paddingBottom={1}
            display="flex"
          >
            <ConversionBox />
            {isThereMoreThanOneBox && (
              <RemoveConversionBoxButton
                onClick={removeConversionBox(convertionBoxIndex)}
              />
            )}
          </Box>

          {index !== conversionBoxIndexes.length - 1 && <Divider />}
        </>
      ))}

      <Divider />

      <Box width="100%" display="flex" justifyContent="center">
        <AddConversionBoxButton onClick={addConversionBox} />
      </Box>
    </Box>
  );
};

const RemoveConversionBoxButton = memo(
  ({ onClick, ...props }: IconButtonProps) => {
    return (
      <IconButton
        color="secondary"
        onClick={onClick}
        aria-label="remove-convertion-box"
        {...props}
      >
        <RemoveCircle />
      </IconButton>
    );
  }
);

const AddConversionBoxButton = memo(
  ({ onClick, ...props }: IconButtonProps) => {
    return (
      <IconButton
        style={{ color: green[600] }}
        onClick={onClick}
        aria-label="remove-convertion-box"
        {...props}
      >
        <ControlPoint />
      </IconButton>
    );
  }
);
