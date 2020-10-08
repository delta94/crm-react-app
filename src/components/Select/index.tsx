import { Box, Button, Flex, Icon, Text } from "@chakra-ui/core";
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
  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );

  // Get props for the button based on the trigger props from useSelect
  let { buttonProps } = useButton(triggerProps, ref);

  return (
    <Box display="inline-block" position="relative">
      {/* <div {...labelProps}>{props.label}</div> */}
      <HiddenSelect state={state} triggerRef={ref} label={props.label} />
      <Button
        {...buttonProps}
        colorScheme="blue"
        bg="blue.400"
        _hover={{ bg: "blue.600" }}
        ref={ref}
      >
        <Flex mr={4} as="span" {...valueProps} fontWeight={600} fontSize="md">
          <Text mr={1} as="span" opacity="87%">
            Search by:
          </Text>
          <Text as="span">
            {state.selectedItem
              ? state.selectedItem.rendered
              : "Select an option"}
          </Text>
        </Flex>
        <Icon
          boxSize="17px"
          color="white"
          aria-hidden="true"
          as={FiChevronDown}
        />
      </Button>
      {state.isOpen && <ListBoxPopup {...menuProps} state={state} />}
    </Box>
  );
};

export default Select;
