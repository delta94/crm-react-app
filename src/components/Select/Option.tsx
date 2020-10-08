import { Box } from "@chakra-ui/core";
import { useFocus } from "@react-aria/interactions";
import { useOption } from "@react-aria/listbox";
import { mergeProps } from "@react-aria/utils";
import React from "react";

const Option = ({ item, state }) => {
  // Get props for the option element
  let ref = React.useRef();
  let isDisabled = state.disabledKeys.has(item.key);
  let isSelected = state.selectionManager.isSelected(item.key);
  let { optionProps } = useOption(
    {
      key: item.key,
      isDisabled,
      isSelected,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
    },
    state,
    ref
  );

  // Handle focus events so we can apply highlighted
  // style to the focused option
  let [isFocused, setFocused] = React.useState(false);
  let { focusProps } = useFocus({ onFocusChange: setFocused });

  return (
    <Box
      as="li"
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      bg="blue.400"
      color="rgba(255, 255, 255, .87)"
      _hover={{ color: "white" }}
      px={2}
      py={2}
      outline="none"
      cursor="pointer"
      fontWeight={600}
      // style={{
      //   background: isSelected
      //     ? "blueviolet"
      //     : isFocused
      //     ? "gray"
      //     : "transparent",
      //   color: isSelected || isFocused ? "white" : "black",
      //   padding: "2px 5px",
      //   outline: "none",
      //   cursor: "pointer",
      // }}
    >
      {item.rendered}
    </Box>
  );
};

export default Option;
