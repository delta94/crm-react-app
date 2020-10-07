import { Box } from "@chakra-ui/core";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { useTableRow } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import React, { useRef } from "react";
import useTableContext from "./useTableContext";

const TableRow = ({ item, children, ...otherProps }) => {
  let ref = useRef();
  let state = useTableContext();
  let isSelected = state.selectionManager.isSelected(item.key);
  let { rowProps } = useTableRow(
    {
      node: item,
      isSelected,
      ref,
      isVirtualized: true,
    },
    state
  );

  // The row should show the focus background style when any cell inside it is focused.
  // If the row itself is focused, then it should have a blue focus indicator on the left.
  let {
    isFocusVisible: isFocusVisibleWithin,
    focusProps: focusWithinProps,
  } = useFocusRing({ within: true });
  let { isFocusVisible, focusProps } = useFocusRing();
  let { hoverProps, isHovered } = useHover({});
  let props = mergeProps(
    rowProps,
    otherProps,
    focusWithinProps,
    focusProps,
    hoverProps
  );

  return (
    <Box
      {...props}
      ref={ref}
      _even={{ bg: "gray.50" }}
      // className={
      //   classNames(
      //     styles,
      //     'spectrum-Table-row',
      //     {
      //       'is-selected': isSelected,
      //       'is-focused': isFocusVisibleWithin,
      //       'focus-ring': isFocusVisible,
      //       'is-hovered': isHovered
      //     }
      //   )
      // }
    >
      {children}
    </Box>
  );
};

export default TableRow;
