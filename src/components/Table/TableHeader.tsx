import { Box } from "@chakra-ui/core";
import { useTableRowGroup } from "@react-aria/table";
import React from "react";

const TableHeader = ({ children, ...otherProps }) => {
  let { rowGroupProps } = useTableRowGroup();

  return (
    <Box
      bg="gray.50"
      borderBottomColor="gray.200"
      borderBottomStyle="solid"
      borderBottomWidth="1px"
      fontSize="sm"
      fontWeight={600}
      color="gray.500"
      display="sticky"
      {...rowGroupProps}
      {...otherProps}
      // className={classNames(styles, "spectrum-Table-head")}
    >
      {children}
    </Box>
  );
};

export default TableHeader;
