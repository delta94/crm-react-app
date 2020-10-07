import { Box, ChakraComponent } from "@chakra-ui/core";
import React from "react";
import { ReactComponent as LogoSvg } from "../assets/ofb_logo.svg";

const LogoBase = (props) => {
  return <Box {...props} as={LogoSvg} />;
};

const Logo = LogoBase as ChakraComponent<"svg", {}>;

export default Logo;
