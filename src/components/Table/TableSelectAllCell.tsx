import { Checkbox, Flex } from "@chakra-ui/core";
import { useHover } from "@react-aria/interactions";
import {
  useTableColumnHeader,
  useTableSelectAllCheckbox,
} from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import React, { useRef } from "react";
import useTableContext from "./useTableContext";

const TableSelectAllCell = ({ column }) => {
  let ref = useRef();
  let state = useTableContext();
  let {
    columnHeaderProps: { onClick, ...columnHeaderProps },
  } = useTableColumnHeader(
    {
      node: column,
      ref,
      colspan: column.colspan,
      isVirtualized: true,
    },
    state
  );

  let {
    checkboxProps: { isSelected, onChange, ...checkboxProps },
  } = useTableSelectAllCheckbox(state);
  let { hoverProps } = useHover({});

  return (
    <Flex
      {...mergeProps(columnHeaderProps, hoverProps)}
      ref={ref}
      align="center"
      justify="center"
      h="100%"
    >
      {state.selectionManager.selectionMode !== "none" && (
        <Checkbox
          isChecked={isSelected}
          onChange={() => onChange(true)}
          {...checkboxProps}
        />
      )}
    </Flex>
  );
};

export default TableSelectAllCell;
