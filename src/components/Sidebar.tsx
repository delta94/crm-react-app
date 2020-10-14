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
} from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import {
  FiArrowDownLeft,
  FiChevronLeft,
  FiCreditCard,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion.custom(Box);
const MotionStack = motion.custom(Stack) as typeof MotionBox;
const MotionText = motion.custom(Text) as typeof MotionBox;
const MotionIconButton = motion.custom(IconButton);
const MotionIcon = motion.custom(Icon);

// Use component based method like chakra-ui, not object based
const menus = [
  {
    icon: FiUsers,
    label: "Clients",
    url: "/clients",
    children: [
      { icon: FiUsers, label: "Users", url: "/users" },
      {
        icon: FiCreditCard,
        label: "Payment",
        url: "",
        children: [
          { icon: FiUsers, label: "Lol", url: "/yes" },
          { icon: FiCreditCard, label: "Lol2", url: "/not" },
        ],
      },
    ],
  },
  {
    icon: FiCreditCard,
    label: "Payments",
    url: "/payments",
    children: [
      { icon: FiUsers, label: "Lol", url: "/users" },
      { icon: FiCreditCard, label: "Lol2", url: "/payments" },
    ],
  },
  {
    icon: FiCreditCard,
    label: "Not payments",
    url: "/not-payments",
    children: [
      { icon: FiUsers, label: "Huh?", url: "/users" },
      { icon: FiCreditCard, label: "Lol2", url: "/payments" },
    ],
  },
];
function getRandomInt(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
const flatten = (
  arr: any[],
  prefix: string = "",
  parentKey: string = ""
): any[] => {
  const flattened = [];
  arr.forEach((item) => {
    const key = item.label + getRandomInt(0, 100);
    flattened.push({
      ...item,
      url: prefix + item.url,
      parentKey: parentKey || null,
      key,
    });
    if (item.children) {
      flattened.push(...flatten(item.children, prefix + item.url, key));
    }
  });

  return flattened;
};

const flatMenu = flatten(menus);
console.log(flatMenu);

interface NavLinkProps extends BoxProps {
  to: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, to, ...otherProps }) => {
  const match = useRouteMatch({ exact: false, path: to.toString() });
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

interface NestedNavLinkProps extends BoxProps {
  paths: string[];
}

const NestedNavLink: React.FC<NestedNavLinkProps> = ({
  children,
  paths,
  ...otherProps
}) => {
  const match = useRouteMatch({ exact: false, path: paths });
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
      // to=''
      aria-selected={!!match}
      _selected={{ bg: "gray.100" }}
    >
      {children}
    </Box>
  );
};

// const Nav = () => {

//   return <Menu>
//     <SubMenu title="Clients" icon={FiUsers}>
//       <MenuLabel
//         <SubMenu>
//           <MenuItem
//         </SubMenu>
//     </SubMenu>
//   </Menu>
// }

const Sidebar = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  // const [selectedMenu, setSelectedMenu] = useState(menus[0]);
  const location = useLocation();
  // console.log(location);

  const [selectedMenu, setSelectedMenu] = useState(flatMenu[0]);

  useEffect(() => {
    const current = flatMenu.find((menu) => menu.url === location.pathname);
    let parent: any = flatMenu.find((item) => item.key === current.parentKey);
    if (parent) {
      setSelectedMenu(parent);
    }
  }, []);
  console.log(selectedMenu);
  const childIds = selectedMenu.children.map((c) => c.key);
  const items = flatMenu.filter((item) => childIds.includes(item.key));
  console.log(childIds);

  return (
    <>
      <AnimatePresence initial={false}>
        <MotionBox
          layout
          animate={{
            width: isOpen ? 320 : 60,
            transition: { duration: 0.21, ease: "easeInOut" },
          }}
        />
        <Box
          position="fixed"
          top={0}
          left={0}
          w="320px"
          height="100vh"
          d="flex"
        >
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
              {menus.map((item, key) => (
                <NavLink
                  onClick={() => {
                    setSelectedMenu(item);
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
              ))}
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
              <MotionIcon
                // @ts-ignore
                as={FiChevronLeft}
                animate={{
                  rotate: isOpen ? "0deg" : "180deg",
                  transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                    type: "tween",
                  },
                }}
                boxSize={4}
              />
            }
          />
          <MotionBox
            overflow="hidden"
            borderRightWidth="1px"
            borderRightColor="gray.200"
            borderRightStyle="solid"
            pt={16}
            flexDirection="column"
            display="flex"
            height="100%"
            bg="gray.50"
            pos="relative"
            whiteSpace="nowrap"
            animate={{
              width: isOpen ? 260 : 0,
              transition: {
                duration: 0.3,
                ease: "easeInOut",
                type: "tween",
              },
            }}
          >
            {selectedMenu.children && (
              <Flex>
                <Icon as={FiArrowDownLeft} />
                {selectedMenu.label}
              </Flex>
            )}
            <Stack
              position="absolute"
              top={16}
              left={0}
              width="260px"
              px="14px"
            >
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
    </>
  );
};

export default Sidebar;
