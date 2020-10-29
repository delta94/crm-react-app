import { Box, Flex } from "@chakra-ui/core";
import Sidebar from "components/Sidebar";
import React, { useEffect } from "react";
import Clients from "modules/clients";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Payments from "modules/payments";
import User from "modules/user";

import menus from "components/Sidebar/menus";

const Dashboard = () => {
  const history = useHistory();
  const isHome = useRouteMatch({ exact: true, path: "/" });

  useEffect(() => {
    if (isHome) {
      history.replace("/clients");
    }
  }, []); // eslint-disable-line

  return (
    <Flex>
      <Sidebar menus={menus} />
      <Flex
        minHeight="100vh"
        justify="center"
        flex={1}
        bg="gray.100"
        overflow="auto"
      >
        <Box pb="100px" width="90%" maxW="1200px" mt="50px">
          <Switch>
            <Route path="/clients">
              <Clients />
            </Route>
            <Route path="/payments">
              <Payments />
            </Route>
            <Route path="/user">
              <User />
            </Route>
          </Switch>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
