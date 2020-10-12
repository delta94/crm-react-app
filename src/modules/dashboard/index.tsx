import { Box, Flex } from "@chakra-ui/core";
import Sidebar from "components/Sidebar";
import React, { useEffect } from "react";

import Clients from "modules/clients";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import Payments from "modules/payments";

const Dashboard = () => {
  const history = useHistory();
  const isHome = useRouteMatch({ exact: true, path: "/" });

  useEffect(() => {
    if (isHome) {
      history.replace("/clients");
    }
  }, []);

  return (
    <Flex height="100vh">
      <Sidebar />
      <Flex justify="center" flex={1} bg="gray.100" overflow="auto">
        <Box width="90%" maxW="1060px" mt="50px">
          <Switch>
            <Route path="/clients">
              <Clients />
            </Route>
            <Route path="/payments">
              <Payments />
            </Route>
          </Switch>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
