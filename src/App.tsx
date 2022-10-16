import { Box } from "@chakra-ui/react";
import { Switch } from "react-router-dom";
import DynamicFormProvider from "./contexts/DynamicFormContext";
import Routes from "./route/Routes";

function App() {
  return (
    <Box>
      <DynamicFormProvider>
        <Switch>
          <Routes />
        </Switch>
      </DynamicFormProvider>
    </Box>
  );
}

export default App;
