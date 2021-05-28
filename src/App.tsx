import { useTheme, Box, Divider, IconButton } from "@material-ui/core";
import { ConvertionUnit } from "./components/ConvertionBox";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { useState } from "react";

const App = () => {
  const theme = useTheme();
  const [convertionBoxIndexes, setConvertionBoxIndexes] = useState<number[]>([
    0, // we have at least 1 box
  ]);

  const addNewConvertionBox = () => {
    setConvertionBoxIndexes((convertionBoxIndexes) => [
      ...convertionBoxIndexes,
      convertionBoxIndexes[convertionBoxIndexes.length - 1] + 1,
    ]);
  };

  const removeConvertionBox = (indexToRemove: number) => () => {
    setConvertionBoxIndexes((convertionBoxIndexes) =>
      convertionBoxIndexes.filter((index) => index !== indexToRemove)
    );
  };

  return (
    <Box>
      <Box margin="auto" padding={10} width="max-content">
        {convertionBoxIndexes.map((convertionBoxIndex) => (
          <Box key={convertionBoxIndex} paddingBottom={1} display="flex">
            <ConvertionUnit index={convertionBoxIndex} />
            <IconButton
              onClick={removeConvertionBox(convertionBoxIndex)}
              aria-label="remove-convertion-box"
            >
              <RemoveCircleIcon />
            </IconButton>
          </Box>
        ))}

        <Divider />

        <Box width="100%" display="flex" justifyContent="center">
          <IconButton
            onClick={addNewConvertionBox}
            aria-label="add-another-convertion-box"
          >
            <ControlPointIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
