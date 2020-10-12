import { Checkbox, Flex } from "@chakra-ui/core";
import { FocusRing } from "@react-aria/focus";
import { useTableCell, useTableSelectionCheckbox } from "@react-aria/table";
import React, { useRef } from "react";
import useTableContext from "./useTableContext";

const TableCheckboxCell = ({ cell }) => {
  let ref = useRef();
  let state = useTableContext();
  let {
    gridCellProps: { onClick, ...gridCellProps },
  } = useTableCell(
    {
      node: cell,
      ref,
      isVirtualized: true,
    },
    state
  );

  let {
    checkboxProps: { onChange, isSelected, ...checkboxProps },
  } = useTableSelectionCheckbox({ key: cell.parentKey }, state);

  return (
    <FocusRing>
      <Flex
        {...gridCellProps}
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
    </FocusRing>
  );
};

export default TableCheckboxCell;
