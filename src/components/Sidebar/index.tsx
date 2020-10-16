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
  Tooltip,
  IconButton,
  Heading,
} from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import {
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import menus from "./menus";

const MotionBox = motion.custom(Box);

const flatten = (arr: any[], parentKey: string = ""): any[] => {
  const flattened = [];
  arr.forEach((item) => {
    flattened.push({
      ...item,
      parentKey: parentKey || null,
    });
    if (item.children) {
      flattened.push(...flatten(item.children, item.key));
    }
  });

  return flattened;
};

const flatMenu = flatten(menus);

interface NavLinkProps extends BoxProps {
  to: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, to, ...otherProps }) => {
  const match = useRouteMatch({ exact: false, path: to.toString() });
  return (
    <Box
      display="flex"
      alignItems="center"
      px="10px"
      height="40px"
      borderRadius="4px"
      cursor="pointer"
      fontSize="sm"
      fontWeight={500}
      {...(otherProps as any)}
      as={Link}
      transition="all .1s ease-in-out"
      _hover={{ bg: "gray.100" }}
      to={to}
      aria-selected={!!match}
      _selected={{ bg: "gray.100" }}
    >
      {children}
    </Box>
  );
};

interface NestedNavLinkProps extends BoxProps {
  paths: string[];
  hasArrow?: boolean;
}

const NestedNavLink: React.FC<NestedNavLinkProps> = ({
  children,
  paths,
  hasArrow = true,
  ...otherProps
}) => {
  const match = useRouteMatch({ exact: false, path: paths });
  return (
    <Box
      display="flex"
      alignItems="center"
      px="10px"
      height="40px"
      borderRadius="4px"
      cursor="pointer"
      fontSize="sm"
      fontWeight={500}
      {...(otherProps as any)}
      as={Link}
      transition="all .1s ease-in-out"
      _hover={{ bg: "gray.100" }}
      aria-selected={!!match}
      _selected={{ bg: "gray.100" }}
    >
      {children}{" "}
      {hasArrow && <Icon boxSize={5} ml="auto" as={FiChevronRight} />}
    </Box>
  );
};

const Sidebar = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(flatMenu[0]);

  useEffect(() => {
    const current = flatMenu.find((menu) => menu.url === location.pathname);
    let parent: any = flatMenu.find((item) => item.key === current.parentKey);
    if (parent) {
      setSelectedMenu(parent);
    }
  }, []);

  const childIds = selectedMenu.children.map((c) => c.key);
  const items = flatMenu.filter((item) => childIds.includes(item.key));

  const goBack = () => {
    const parent = flatMenu.find((menu) => menu.key === selectedMenu.parentKey);
    setSelectedMenu(parent);
  };

  return (
    <AnimatePresence initial={false}>
      <MotionBox
        layout
        animate={{
          width: isOpen ? 320 : 60,
          transition: { duration: 0.21, ease: "easeInOut" },
        }}
        style={{ position: "relative" }}
      >
        <IconButton
          size="xs"
          position="absolute"
          right={0}
          top="20px"
          transform="translateX(50%)"
          borderRadius="50%"
          aria-label="Toggle submenu"
          bg="gray.200"
          onClick={onToggle}
          zIndex={9}
          icon={
            <Icon
              // @ts-ignore
              as={FiChevronLeft}
              style={{
                transform: `rotate(${isOpen ? "0deg" : "180deg"})`,
              }}
              boxSize={4}
            />
          }
        />
      </MotionBox>

      <Box position="fixed" top={0} left={0} w="320px" height="100vh" d="flex">
        <Box
          borderRightWidth="1px"
          borderRightColor="gray.200"
          borderRightStyle="solid"
          pt={12}
          flexDirection="column"
          display="flex"
          height="100%"
          w="60px"
        >
          <Stack px="10px">
            {menus.map((item: any, key) => {
              if (item.key === "user") {
                return null;
              }
              return (
                <NavLink
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedMenu(item);
                    if (!isOpen) {
                      onToggle();
                    }
                  }}
                  key={key}
                  to={item.url}
                >
                  <Tooltip ml={1} placement="right" label={item.label}>
                    <span>
                      <Icon as={item.icon} boxSize={5} />
                    </span>
                  </Tooltip>
                </NavLink>
              );
            })}
          </Stack>
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
            </Flex>
          </NavLink>
        </Box>

        <MotionBox
          overflow="hidden"
          borderRightWidth="1px"
          borderRightColor="gray.200"
          borderRightStyle="solid"
          pt={8}
          flexDirection="column"
          display="flex"
          height="100%"
          bg="gray.50"
          pos="relative"
          whiteSpace="nowrap"
          animate={{
            width: isOpen ? 260 : 0,
            transition: { duration: 0.21, ease: "easeInOut" },
          }}
        >
          {!!selectedMenu.children && !!selectedMenu.parentKey ? (
            <Flex px="24px" align="center">
              <Button
                leftIcon={<FiArrowLeft />}
                onClick={goBack}
                variant="link"
                color="gray.900"
              >
                {selectedMenu.label}
              </Button>
            </Flex>
          ) : !!selectedMenu.children && !selectedMenu.parentKey ? (
            <Flex px="24px" align="center">
              <Heading size="sm">{selectedMenu.label}</Heading>
            </Flex>
          ) : null}

          <Stack position="absolute" top={20} left={0} width="260px" px="14px">
            {items.map((item, index) => {
              if (item.children) {
                return (
                  <NestedNavLink
                    onClick={() => setSelectedMenu(item)}
                    key={index}
                    paths={item.children.map((item) => item.url)}
                  >
                    <Icon as={item.icon} boxSize={5} />
                    <Text as="span" ml={2}>
                      {item.label}
                    </Text>
                  </NestedNavLink>
                );
              }

              return (
                <NavLink key={index} to={item.url}>
                  <Icon as={item.icon} boxSize={5} />
                  <Text as="span" ml={2}>
                    {item.label}
                  </Text>
                </NavLink>
              );
            })}
          </Stack>
        </MotionBox>
      </Box>
    </AnimatePresence>
  );
};

export default Sidebar;
