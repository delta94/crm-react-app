import React, { useContext } from "react";
import { TableState } from "@react-stately/table";

export const TableContext = React.createContext<TableState<unknown>>(null);
function useTableContext() {
  return useContext(TableContext);
}

export default useTableContext;
