import { Box } from "@chakra-ui/core";
import React from "react";

const TableHeaderRow = ({ item, children, ...otherProps }) => {
  return (
    <Box role="row" aria-rowindex={item.index + 1} {...otherProps}>
      {children}
    </Box>
  );
};

export default TableHeaderRow;
