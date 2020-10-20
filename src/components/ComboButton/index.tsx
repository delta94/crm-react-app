import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  SlideFade,
  Text,
} from "@chakra-ui/core";
import { useButton } from "@react-aria/button";
import { AriaSelectOptions, HiddenSelect, useSelect } from "@react-aria/select";
import { useSelectState } from "@react-stately/select";
import ListBoxPopup from "components/Select/ListBoxPopup";
import React from "react";
import { FiChevronDown } from "react-icons/fi";

const ComboButton = (
  props: AriaSelectOptions<{}> & {
    leftIcon?: React.ReactElement;
    onClick?: () => void;
  }
) => {
  // Create state based on the incoming props
  let state = useSelectState(props);

  // Get props for child elements from useSelect
  let ref = React.useRef();
  let { triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );

  // Get props for the button based on the trigger props from useSelect
  let { buttonProps } = useButton(triggerProps, ref);

  return (
    <Box display="inline-block" position="relative">
      <HiddenSelect state={state} triggerRef={ref} label={props.label} />
      <Flex>
        <Button
          isDisabled={props.isDisabled}
          isLoading={props.isLoading}
          colorScheme="blue"
          bg="blue.400"
          _hover={{ bg: "blue.500" }}
          color="white"
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          leftIcon={props.leftIcon}
          onClick={props.onClick}
        >
          <Flex as="span" {...valueProps} fontWeight={600} fontSize="md">
            {props.label && (
              <Text mr={1} as="span" opacity="87%">
                {props.label}
              </Text>
            )}
            <Text as="span">
              {state.selectedItem
                ? state.selectedItem.rendered
                : props.placeholder || "Select an action"}
            </Text>
          </Flex>
        </Button>
        <Divider
          borderColor="blue.300"
          opacity={1}
          h="2.5rem"
          orientation="vertical"
        />
        <Button
          {...buttonProps}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
          colorScheme="blue"
          // borderLeftWidth="1px"
          bg={state.isOpen ? "blue.500" : "blue.400"}
          _hover={{ bg: "blue.500" }}
          color="white"
          transition="background .2s ease-in-out"
          ref={ref}
          p={0}
        >
          <Icon
            boxSize="17px"
            color="current"
            aria-hidden="true"
            as={FiChevronDown}
            transform={`rotate(${state.isOpen ? 180 : 0}deg)`}
            transition="transform .2s ease-in-out"
          />
        </Button>
      </Flex>
      <SlideFade initialOffset="6px" in={state.isOpen}>
        {(styles) => (
          <ListBoxPopup
            {...menuProps}
            style={{ ...styles, ...menuProps.style }}
            state={state}
          />
        )}
      </SlideFade>
    </Box>
  );
};

export default ComboButton;
