import { Box, Button, Flex, Icon, Stack } from "@chakra-ui/core";
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { FiUsers } from "react-icons/fi";

interface NavLinkProps {
  to: string;
}

const NavLink: React.FC<NavLinkProps> = (props) => {
  const match = useRouteMatch({ exact: true, path: props.to.toString() });
  return (
    <Box
      bg={match ? "gray.100" : "transparent"}
      display="flex"
      alignItems="center"
      p={2}
      borderRadius="6px"
      cursor="pointer"
      fontSize="sm"
      fontWeight={500}
      as={Link}
      to={props.to}
    >
      {props.children}
    </Box>
  );
};

const Sidebar = () => {
  return (
    <Flex
      borderRightWidth="1px"
      borderRightColor="gray.200"
      borderRightStyle="solid"
      width="260px"
      pt={12}
      justify="center"
      height="100%"
    >
      <Stack width="90%">
        {/* @ts-ignore */}
        <NavLink ex to="/">
          <Icon as={FiUsers} boxSize={5} mr={2} />
          Users
        </NavLink>
        <NavLink to="/user">hey</NavLink>
        <NavLink to="/user2">hey</NavLink>
        <NavLink to="/user3">hey</NavLink>
      </Stack>
    </Flex>
  );
};

export default Sidebar;
