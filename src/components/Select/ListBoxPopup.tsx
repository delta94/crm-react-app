import { Box } from "@chakra-ui/core";
import { FocusScope } from "@react-aria/focus";
import { useListBox } from "@react-aria/listbox";
import { DismissButton, useOverlay } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import React from "react";
import Option from "./Option";

const ListBoxPopup = ({ state, ...otherProps }) => {
  let ref = React.useRef();

  // Get props for the listbox
  let { listBoxProps } = useListBox(
    {
      autoFocus: state.focusStrategy || true,
      disallowEmptySelection: true,
      "aria-label": "hey",
    },
    state,
    ref
  );

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  let overlayRef = React.useRef();
  let { overlayProps } = useOverlay(
    {
      onClose: () => state.close(),
      shouldCloseOnBlur: true,
      isOpen: state.isOpen,
      isDismissable: true,
    },
    overlayRef
  );

  // Wrap in <FocusScope> so that focus is restored back to the
  // trigger when the popup is closed. In addition, add hidden
  // <DismissButton> components at the start and end of the list
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope restoreFocus>
      <Box {...overlayProps} ref={overlayRef}>
        <DismissButton onDismiss={() => state.close()} />
        <Box
          as="ul"
          pos="absolute"
          w="100%"
          mt={2}
          bg="gray.400"
          zIndex={10}
          p={0}
          listStyleType="none"
          borderRadius="4px"
          overflow="hidden"
          {...mergeProps(listBoxProps, otherProps)}
          ref={ref}
        >
          {[...state.collection].map((item) => (
            <Option key={item.key} item={item} state={state} />
          ))}
        </Box>
        <DismissButton onDismiss={() => state.close()} />
      </Box>
    </FocusScope>
  );
};

export default ListBoxPopup;
