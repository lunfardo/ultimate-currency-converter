import { QueryClient, QueryClientProvider } from "react-query";

import { AppBar, Toolbar } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

import { CurrenciesConverter } from "./components/pages/CurrenciesConverter";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <AppBar position="fixed">
          <Toolbar>Ultimate Currency Converter 🚀</Toolbar>
        </AppBar>
        <CurrenciesConverter />
      </MuiPickersUtilsProvider>
    </QueryClientProvider>
  );
};

export default App;
