import * as React from "react";
import "focus-visible";
import { ChakraProvider, CSSReset } from "@chakra-ui/core";
import { Provider } from "react-redux";
import { store, persistor } from "store";
import { PersistGate } from "redux-persist/integration/react";
import Login from "./auth/login";
import Dashboard from "./dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "components/PrivateRoute";
import theme from "config/theme";
import { I18nProvider } from "@react-aria/i18n";
import { useAxios } from "helpers/api";

const SetupAxios = () => {
  useAxios();
  return null;
};

export const App = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <I18nProvider>
      <Router>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/">
                <Dashboard />
              </PrivateRoute>
            </Switch>
          </PersistGate>
        </Provider>
      </Router>
    </I18nProvider>
  </ChakraProvider>
);
