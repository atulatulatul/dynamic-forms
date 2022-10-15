import { Box } from "@chakra-ui/react";
import { Switch } from "react-router-dom";
import Routes from "./route/Routes";

function App() {
  return (
    <Box>
      <Switch>
        <Routes />
      </Switch>
    </Box>
  );
}

export default App;
