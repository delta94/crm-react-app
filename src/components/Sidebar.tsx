import {
  Box,
  BoxProps,
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  useDisclosure,
  Text,
} from "@chakra-ui/core";
import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { FiCreditCard, FiUser, FiUsers } from "react-icons/fi";

interface NavLinkProps extends BoxProps {
  to: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, to, ...otherProps }) => {
  const match = useRouteMatch({ exact: true, path: to.toString() });
  return (
    <Box
      bg={match ? "gray.100" : "transparent"}
      display="flex"
      alignItems="center"
      px={2}
      // py="10px"
      height="40px"
      borderRadius="4px"
      cursor="pointer"
      fontSize="sm"
      fontWeight={500}
      {...(otherProps as any)}
      as={Link}
      to={to}
    >
      {children}
    </Box>
  );
};

const Sidebar = () => {
  const { isOpen: collapsed, onToggle } = useDisclosure();
  return (
    <Flex
      borderRightWidth="1px"
      borderRightColor="gray.200"
      borderRightStyle="solid"
      width={collapsed ? "49px" : "260px"}
      pt={12}
      // justify="space-between"
      // align="center"
      height="100%"
      transition="all .2s ease-in-out"
      direction="column"
    >
      <Button onClick={onToggle}>toggle</Button>
      <Stack
        width={collapsed ? "48px" : "100%"}
        transition="all .1s ease-in-out"
        px="5px"
      >
        {/* @ts-ignore */}
        <NavLink exact to="/clients">
          <Icon as={FiUsers} boxSize={5} />

          <Text
            ml={2}
            as="span"
            opacity={collapsed ? 0 : 1}
            visibility={collapsed ? "hidden" : "visible"}
            transition="all .1s ease-in-out"
          >
            Clients
          </Text>
        </NavLink>
        <NavLink to="/payments">
          <Icon as={FiCreditCard} boxSize={5} />
          <Text
            ml={2}
            as="span"
            visibility={collapsed ? "hidden" : "visible"}
            opacity={collapsed ? 0 : 1}
            transition="all .1s ease-in-out"
          >
            Payments
          </Text>
        </NavLink>
      </Stack>
      <Divider mt="auto" />
      <NavLink
        _hover={{ bg: "gray.100" }}
        transition="all .1s ease-in-out"
        width="100%"
        to="/user"
        height="60px"
      >
        <Flex
          mx="auto"
          w={collapsed ? "40px" : "233px"}
          justify="flex-start"
          transition="all .1s ease-in-out"
          align="center"
        >
          <Icon as={FiUser} boxSize={5} />

          <Flex
            opacity={collapsed ? 0 : 1}
            visibility={collapsed ? "hidden" : "visible"}
            transition="opacity .1s ease-in-out"
            width={collapsed ? "0" : "auto"}
            as="span"
            direction="column"
            ml={3}
          >
            <Text as="span" fontWeight={500}>
              Tom Cook
            </Text>
            <Text as="span" color="gray.500">
              View profile
            </Text>
          </Flex>
        </Flex>
      </NavLink>
    </Flex>
  );
};

export default Sidebar;
