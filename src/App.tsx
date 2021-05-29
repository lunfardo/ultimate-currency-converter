import {
  useTheme,
  Box,
  Divider,
  IconButton,
  AppBar,
  Toolbar,
  IconButtonProps,
} from "@material-ui/core";
import { ConversionBox } from "./components/ConversionBox";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { green } from "@material-ui/core/colors";
import { memo, useState } from "react";

const RemoveConversionBoxButton = memo(
  ({ onClick, ...props }: IconButtonProps) => {
    return (
      <IconButton
        color="secondary"
        onClick={onClick}
        aria-label="remove-convertion-box"
        {...props}
      >
        <RemoveCircleIcon />
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
        <ControlPointIcon />
      </IconButton>
    );
  }
);

const App = () => {
  const [conversionBoxIndexes, setConversionBoxIndexes] = useState<number[]>([
    0, // we have at least 1 box
  ]);
  const isThereMoreThanOneBox = conversionBoxIndexes.length > 1;

  const addConvertionBox = () => {
    setConversionBoxIndexes((conversionBoxIndexes) => [
      ...conversionBoxIndexes,
      conversionBoxIndexes[conversionBoxIndexes.length - 1] + 1,
    ]);
  };

  const removeConvertionBox = (indexToRemove: number) => () => {
    setConversionBoxIndexes((conversionBoxIndexes) =>
      conversionBoxIndexes.filter((index) => index !== indexToRemove)
    );
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>Ultimate Currency Convertor</Toolbar>
      </AppBar>

      <Box margin="auto" padding={10} width="max-content">
        {conversionBoxIndexes.map((convertionBoxIndex) => (
          <Box key={convertionBoxIndex} paddingBottom={1} display="flex">
            <ConversionBox />
            {isThereMoreThanOneBox && (
              <RemoveConversionBoxButton
                onClick={removeConvertionBox(convertionBoxIndex)}
              />
            )}
          </Box>
        ))}

        <Divider />

        <Box width="100%" display="flex" justifyContent="center">
          <AddConversionBoxButton onClick={addConvertionBox} />
        </Box>
      </Box>
    </>
  );
};

export default App;
