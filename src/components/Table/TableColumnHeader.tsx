import { Box, Icon } from "@chakra-ui/core";
import { FocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { useTableColumnHeader } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { SpectrumColumnProps } from "@react-types/table";
import React, { useRef } from "react";
import useTableContext from "./useTableContext";
import { FiArrowUp } from "react-icons/fi";

const TableColumnHeader = ({ column }) => {
  let ref = useRef();
  let state = useTableContext();
  let { columnHeaderProps } = useTableColumnHeader(
    {
      node: column,
      ref,
      colspan: column.colspan,
      isVirtualized: true,
    },
    state
  );

  let { align, ...columnProps } = column.props as SpectrumColumnProps<unknown>;
  let { hoverProps, isHovered } = useHover({});

  const isCol = state.sortDescriptor?.column === column.key;
  const isDesc = isCol && state.sortDescriptor?.direction === "descending";
  const isAsc = isCol && state.sortDescriptor?.direction === "ascending";

  return (
    <FocusRing>
      <Box
        {...mergeProps(columnHeaderProps, hoverProps)}
        ref={ref}
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent={
          align === "center"
            ? "center"
            : align === "end"
            ? "flex-end"
            : align === "start"
            ? "flex-start"
            : "initial"
        }
        px={4}
        cursor="default"
        _hover={{ color: columnProps.allowsSorting ? "gray.600" : "gray.500" }}
      >
        {column.rendered}
        {columnProps.allowsSorting && (
          <Icon
            ml={2}
            transition="transform .1s ease-in-out"
            as={FiArrowUp}
            transform={`rotate(${isDesc ? 180 : 0}deg)`}
            display={isCol ? "inline-block" : "none"}
          />
        )}
      </Box>
    </FocusRing>
  );
};

export default TableColumnHeader;
