import { Box, Button, Flex, Icon, SlideFade, Text } from "@chakra-ui/core";
import { useButton } from "@react-aria/button";
import { AriaSelectOptions, HiddenSelect, useSelect } from "@react-aria/select";
import { useSelectState } from "@react-stately/select";
import React from "react";
import { FiChevronDown } from "react-icons/fi";
import ListBoxPopup from "./ListBoxPopup";

const Select = (props: AriaSelectOptions<{}>) => {
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
      <Button
        {...buttonProps}
        colorScheme="gray"
        bg="gray.300"
        _hover={{ bg: "gray.400" }}
        color="gray.700"
        ref={ref}
      >
        <Flex mr={4} as="span" {...valueProps} fontWeight={600} fontSize="md">
          {props.label && (
            <Text mr={1} as="span" opacity="87%">
              {props.label}
            </Text>
          )}
          <Text as="span">
            {state.selectedItem
              ? state.selectedItem.rendered
              : "Select an option"}
          </Text>
        </Flex>
        <Icon
          boxSize="17px"
          color="gray.700"
          aria-hidden="true"
          as={FiChevronDown}
          transform={`rotate(${state.isOpen ? 180 : 0}deg)`}
          transition="transform .2s ease-in-out"
        />
      </Button>
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

export default Select;
