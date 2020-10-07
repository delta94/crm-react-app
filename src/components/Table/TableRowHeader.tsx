import { useTableRowHeader } from "@react-aria/table";
import React, { useRef } from "react";
import TableCellBase from "./TableCellBase";
import useTableContext from "./useTableContext";

const TableRowHeader = ({ cell }) => {
  let ref = useRef();
  let state = useTableContext();
  let { rowHeaderProps } = useTableRowHeader(
    {
      node: cell,
      ref,
      isVirtualized: true,
    },
    state
  );

  return <TableCellBase {...rowHeaderProps} cell={cell} cellRef={ref} />;
};

export default TableRowHeader;
