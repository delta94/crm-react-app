import { Flex } from "@chakra-ui/core";
import React from "react";
import useTableContext from "./useTableContext";

const CenteredWrapper = ({ children }) => {
  let state = useTableContext();
  return (
    <Flex
      align="center"
      justify="center"
      role="row"
      aria-rowindex={
        state.collection.headerRows.length + state.collection.size + 1
      }
    >
      <div role="rowheader" aria-colspan={state.collection.columns.length}>
        {children}
      </div>
    </Flex>
  );
};

export default CenteredWrapper;
