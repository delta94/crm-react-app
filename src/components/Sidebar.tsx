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
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion.custom(Box);
const MotionStack = motion.custom(Stack) as typeof MotionBox;
const MotionText = motion.custom(Text) as typeof MotionBox;

interface NavLinkProps extends BoxProps {
  to: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, to, ...otherProps }) => {
  const match = useRouteMatch({ exact: true, path: to.toString() });
  return (
    <Box
      // bg={match ? "gray.100" : "transparent"}
      display="flex"
      alignItems="center"
      px="10px"
      // py="10px"
      height="40px"
      borderRadius="4px"
      cursor="pointer"
      fontSize="sm"
      fontWeight={500}
      {...(otherProps as any)}
      as={Link}
      transition="all .1s ease-in-out"
      _hover={{ bg: "gray.50" }}
      to={to}
      aria-selected={!!match}
      _selected={{ bg: "gray.100" }}
    >
      {children}
    </Box>
  );
};

const Sidebar = () => {
  const { isOpen: collapsed, onToggle } = useDisclosure();
  return (
    <>
      <AnimatePresence initial={false}>
        <MotionBox
          layout
          animate={{
            width: collapsed ? 60 : 260,
            transition: { duration: 0.21, ease: "easeInOut" },
          }}
        />
        <MotionBox
          layout
          animate={{
            width: collapsed ? 60 : 260,
            transition: { duration: 0.21, ease: "easeInOut" },
          }}
          borderRightWidth="1px"
          borderRightColor="gray.200"
          borderRightStyle="solid"
          pt={12}
          height="100vh"
          flexDirection="column"
          display="flex"
          position="fixed"
          top={0}
          left={0}
        >
          <Button onClick={onToggle}>toggle</Button>
          <MotionStack
            layout
            animate={{
              width: collapsed ? 60 : 260,
              transition: { duration: 0.21, ease: "easeInOut" },
              // transitionEnd: { display: "none" },
            }}
            px="10px"
          >
            {/* @ts-ignore */}
            <NavLink exact to="/clients">
              <Icon as={FiUsers} boxSize={5} />

              {!collapsed && (
                <MotionText
                  // @ts-ignore
                  as="span"
                  ml={2}
                  initial={{ opacity: 0, translateY: 3 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 3 }}
                >
                  Clients
                </MotionText>
              )}
            </NavLink>
            <NavLink to="/payments">
              <Icon as={FiCreditCard} boxSize={5} />

              {!collapsed && (
                <MotionText
                  // @ts-ignore
                  as="span"
                  ml={2}
                  initial={{ opacity: 0, translateY: 3 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 3 }}
                >
                  Payments
                </MotionText>
              )}
            </NavLink>
          </MotionStack>
          <Divider mt="auto" />
          <NavLink
            _hover={{ bg: "gray.100" }}
            transition="all .1s ease-in-out"
            width="100%"
            to="/user"
            height="60px"
            px="19.5px"
          >
            <Flex
              align="center"
              justify="flex-start"
              d="flex"
              whiteSpace="nowrap"
            >
              <Icon as={FiUser} boxSize={5} />

              {!collapsed && (
                <MotionBox
                  initial={{ opacity: 0, translateY: 3 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 3 }}
                  // @ts-ignore
                  as="span"
                  flexDirection="column"
                  d="flex"
                  ml={3}
                >
                  <Text as="span" fontWeight={500}>
                    Tom Cook
                  </Text>
                  <Text as="span" color="gray.500">
                    View profile
                  </Text>
                </MotionBox>
              )}
            </Flex>
          </NavLink>
        </MotionBox>
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
