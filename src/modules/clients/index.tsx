import { Box, Flex } from "@chakra-ui/core";
import ClientsTable from "components/ClientsTable";
import Search from "components/Search";
import SectionHeading from "components/SectionHeading";
import React from "react";

const Clients = () => {
  return (
    <Box>
      <SectionHeading mb={10}>Clients</SectionHeading>
      <Search mb={6} />
      {/* <EmptyState text="Start typing to search..." /> */}
      <Box>
        <ClientsTable />
      </Box>
    </Box>
  );
};

export default Clients;
