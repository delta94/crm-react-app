import { Box } from "@chakra-ui/core";
import { useTableRowGroup } from "@react-aria/table";
import React from "react";

const TableRowGroup = ({ children, ...otherProps }) => {
  let { rowGroupProps } = useTableRowGroup();

  return (
    <Box {...rowGroupProps} {...otherProps} _even={{ bg: "gray.100" }}>
      {children}
    </Box>
  );
};

export default TableRowGroup;
