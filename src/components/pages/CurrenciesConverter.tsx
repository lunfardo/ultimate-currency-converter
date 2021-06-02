import { useState } from "react";

import { Box, Divider } from "@material-ui/core";

import { ConversionBox } from "../templates/ConversionBox";
import { AddButton } from "../atoms/AddButton";

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
    console.log(process.env);
    setConversionBoxIndexes((conversionBoxIndexes) =>
      conversionBoxIndexes.filter((index) => index !== indexToRemove)
    );
  };

  return (
    <Box margin="auto" padding={10} width="max-content">
      {conversionBoxIndexes.map((convertionBoxIndex, index) => (
        <div key={convertionBoxIndex}>
          <Box paddingTop={1} paddingBottom={1} display="flex">
            <ConversionBox
              removeEnabled={isThereMoreThanOneBox}
              onRemove={removeConversionBox(convertionBoxIndex)}
            />
          </Box>

          {index !== conversionBoxIndexes.length - 1 && <Divider />}
        </div>
      ))}

      <Divider />

      <Box width="100%" display="flex" justifyContent="center">
        <AddButton onClick={addConversionBox} />
      </Box>
    </Box>
  );
};
