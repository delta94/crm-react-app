import { Box, Flex } from "@chakra-ui/core";
import Sidebar from "components/Sidebar";
import React, { useEffect } from "react";
import Clients from "modules/clients";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Payments from "modules/payments";
import User from "modules/user";

import { useDispatch, useSelector } from "react-redux";
import { uiSelector } from "store/ui/selectors";
import { getMenus } from "store/ui/thunks";

const flatten = (arr: any[], parentKey: string = ""): any[] => {
  const flattened = [];
  arr.forEach((item) => {
    flattened.push({
      ...item,
      parentKey: parentKey || null,
      label: item.name,
      url: item.url ? item.url + "/" + item.name : "/" + item.name
    });
    if (item.menuItems) {
      flattened.push(...flatten(item.menuItems, item.name));
    }
  });

  return flattened;
};

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { menus } = useSelector(uiSelector)
  const isHome = useRouteMatch({ exact: true, path: "/" });
  
  useEffect(() => {
    dispatch(getMenus());
    if (isHome) {
      history.replace("/clients");
    }
  }, []); // eslint-disable-line

  return (
    <Flex>
      <Sidebar menus={flatten(menus)} />
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
