import { Box, Flex } from "@chakra-ui/core";
import Sidebar from "components/Sidebar";
import React from "react";

import ClientsTable from "components/ClientsTable";
import SectionHeading from "components/SectionHeading";
import Search from "components/Search";
import EmptyState from "components/EmptyState";

const Content = () => {
  return (
    <Flex justify="center" flex={1} bg="gray.100" overflow="auto">
      <Box width="90%" maxW="1060px" mt="50px">
        <SectionHeading text="Clients" mb={10} />
        <Search mb={6} />

        {/* <EmptyState text="Start typing to search..." /> */}
        <Box>
          <ClientsTable />
        </Box>
      </Box>
    </Flex>
  );
};

const Dashboard = () => {
  return (
    <Flex height="100vh">
      <Sidebar />
      <Content />
    </Flex>
  );
};

export default Dashboard;
