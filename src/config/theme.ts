import { extendTheme } from "@chakra-ui/core";

const theme = extendTheme({
  styles: {
    global: {
      "*, ::before, ::after": {
        boxSizing: "border-box",
      },
      "html, body": {
        fontFamily: "Inter, system-ui, sans-serif",
        minHeight: "100vh",
      },
      ".js-focus-visible :focus:not(.focus-visible)": {
        outline: "none",
      },
    },
  },
  colors: {
    blue: {
      50: "#EBF7FF",
      100: "#C2E7FF",
      200: "#85CEFF",
      300: "#33ADFF",
      400: "#0099ff",
      500: "#0093F5",
      600: "#007ACC",
      700: "#006EB8",
      800: "#0062A3",
      900: "#00497A",
    },
  },
});

export default theme;
