import { Box, Button, Flex, Spinner } from "@chakra-ui/core";
import axios from "axios";
import ClientsTable from "components/ClientsTable";
import EmptyState from "components/EmptyState";
import Search from "components/Search";
import SectionHeading from "components/SectionHeading";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { search } from "./search";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Clients = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [queryType, setQueryType] = useState("fullname");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      const res = await search(`http://localhost:8081/api/client`, {
        method: "POST",
        data: { [queryType]: query },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYwMjY3MzcwNiwiaWF0IjoxNjAyNjU1NzA2fQ.CuSH1-usJiht-hIUc44QiE-B_G7x8OXEESFLBKhzksT52dm1lxj3juJ6pJHuT0IRYVZ7LMHeCLftK3fWO80URg",
        },
      });
      console.log(res?.data);

      setLoading(false);
      setData(
        res?.data?.clients?.filter(
          (c: any) => c.extid !== null && c.phonenumber !== null
        ) || []
      );
    };
    if (query.length > 0) {
      fetchClients();
    }
  }, [queryType, query]);

  return (
    <Box>
      <SectionHeading mb={10}>Clients</SectionHeading>
      <Search
        query={query}
        setQuery={setQuery}
        queryType={queryType}
        setQueryType={setQueryType}
        mb={6}
      />
      {!data.length && !query.length && (
        <EmptyState text="Start typing to search..." />
      )}

      {/* <Flex align="center" justify="center">
          <Spinner />
        </Flex> */}
      {!!data.length && (
        <Box>
          <ClientsTable items={data} />
          <Button w="200px" colorScheme="blue" mt={8} ml="auto">
            Send SMS
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Clients;
