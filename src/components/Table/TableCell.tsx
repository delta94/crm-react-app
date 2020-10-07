import { useTableCell } from "@react-aria/table";
import React, { useRef } from "react";
import TableCellBase from "./TableCellBase";
import useTableContext from "./useTableContext";

const TableCell = ({ cell }) => {
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

  return <TableCellBase {...gridCellProps} cell={cell} cellRef={ref} />;
};

export default TableCell;
