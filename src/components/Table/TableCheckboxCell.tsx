import { Checkbox } from "@chakra-ui/core";
import { FocusRing } from "@react-aria/focus";
import { useTableCell, useTableSelectionCheckbox } from "@react-aria/table";
import React, { useRef } from "react";
import useTableContext from "./useTableContext";

const TableCheckboxCell = ({ cell }) => {
  let ref = useRef();
  let state = useTableContext();
  let { gridCellProps } = useTableCell(
    {
      node: cell,
      ref,
      isVirtualized: true,
    },
    state
  );

  let {
    checkboxProps: { onChange, ...checkboxProps },
  } = useTableSelectionCheckbox({ key: cell.parentKey }, state);

  return (
    <FocusRing
    // focusRingClass={classNames(styles, 'focus-ring')}
    >
      <div
        {...gridCellProps}
        ref={ref}
        // className={
        //   classNames(
        //     styles,
        //     'spectrum-Table-cell',
        //     'spectrum-Table-checkboxCell',
        //     classNames(
        //       stylesOverrides,
        //       'react-spectrum-Table-cell'
        //     )
        //   )}
      >
        {state.selectionManager.selectionMode !== "none" && (
          <Checkbox
            // onChange={(e)=>{}}
            {...checkboxProps}
            // UNSAFE_className={classNames(styles, 'spectrum-Table-checkbox')}
          />
        )}
      </div>
    </FocusRing>
  );
};

export default TableCheckboxCell;
