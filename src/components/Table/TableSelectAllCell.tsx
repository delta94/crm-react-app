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
  let { columnHeaderProps } = useTableColumnHeader(
    {
      node: column,
      ref,
      colspan: column.colspan,
      isVirtualized: true,
    },
    state
  );

  let { checkboxProps } = useTableSelectAllCheckbox(state);
  let { hoverProps, isHovered } = useHover({});

  return (
    <div
      {...mergeProps(columnHeaderProps, hoverProps)}
      ref={ref}
      // className={
      //   classNames(
      //     styles,
      //     'spectrum-Table-headCell',
      //     'spectrum-Table-checkboxCell',
      //     {
      //       'is-hovered': isHovered
      //     }
      //   )
      // }
    >
      {/* <Checkbox
        {...checkboxProps}
        UNSAFE_className={classNames(styles, 'spectrum-Table-checkbox')} /> */}
    </div>
  );
};

export default TableSelectAllCell;
