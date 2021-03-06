import { Flex, Heading, FlexProps } from "@chakra-ui/core";
import React from "react";

interface Props extends FlexProps {
  text?: string;
}

const EmptyState: React.FC<Props> = ({ text = "Empty", ...props }) => {
  return (
    <Flex py={12} align="center" justify="center" {...props}>
      <Heading as="p" fontWeight={600} size="md" color="gray.500">
        {text}
      </Heading>
    </Flex>
  );
};

export default EmptyState;
