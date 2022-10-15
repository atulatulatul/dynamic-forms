import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import Colors from "./colors";

const theme = extendTheme(
  {
    styles: {
      global: {
        body: {
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            "background-color": "#F5F5F5",
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.3)",
            "background-color": "#F5F5F5",
          },
          "&::-webkit-scrollbar-thumb": {
            "background-color": "#555",
            borderRadius: "24px",
          },
        },
        a: {
          color: "blue.500",
          fontWeight: "bold",
          _hover: {
            color: "blue.500",
          },
          _focus: {
            color: "blue.500",
          },
        },
      },
    },
    colors: {
      ...Colors,
    },
  },
  withDefaultColorScheme({ colorScheme: "blue" })
);

export default theme;
