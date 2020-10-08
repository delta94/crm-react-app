import { Flex, Heading } from "@chakra-ui/core";
import React from "react";
import { FlexProps } from "@chakra-ui/core";

interface Props extends FlexProps {
  text: string;
}

const SectionHeading: React.FC<Props> = (props) => {
  return (
    <Flex
      borderBottomStyle="solid"
      borderBottomWidth="2px"
      borderBottomColor="gray.200"
      pb={3}
      {...props}
    >
      <Heading as="h1" size="md">
        {props.text}
      </Heading>
    </Flex>
  );
};

export default SectionHeading;
