import * as React from "react";
import "focus-visible";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/core";
import theme from "@chakra-ui/theme";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { Provider } from "react-redux";
import { store, persistor } from "store";
import { PersistGate } from "redux-persist/integration/react";
import Login from "./auth/login";
import Dashboard from "./dashboard";
import { BrowserRouter as Router } from "react-router-dom";

const newTheme = extendTheme({
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
});

export const App = () => (
  <ChakraProvider theme={newTheme}>
    <CSSReset />
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <Login /> */}
          <Dashboard />
        </PersistGate>
      </Provider>
    </Router>
  </ChakraProvider>
);
