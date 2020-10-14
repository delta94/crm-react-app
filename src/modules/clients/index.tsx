import { Box, Button, Flex, Spinner, Stack } from "@chakra-ui/core";
import { Selection } from "@react-types/shared";
import axios from "axios";
import ClientsTable from "components/ClientsTable";
import EmptyState from "components/EmptyState";
import Search from "components/Search";
import SectionHeading from "components/SectionHeading";
import { API_URL } from "helpers/api";
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
      // const res = await search(
      //   `https://5f7ebbb0094b670016b76686.mockapi.io/api/clients`,
      //   {
      //     method: "get",
      //     // data: { [queryType]: query },
      //   }
      // );

      const res = await search(`http://localhost:8081/api/client`, {
        method: "POST",
        data: { [queryType]: query },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYwMjY3MzcwNiwiaWF0IjoxNjAyNjU1NzA2fQ.CuSH1-usJiht-hIUc44QiE-B_G7x8OXEESFLBKhzksT52dm1lxj3juJ6pJHuT0IRYVZ7LMHeCLftK3fWO80URg",
        },
      });

      setLoading(false);
      setData(
        res?.data?.clients?.filter(
          (c) => c.extid !== null && c.phonenumber !== null
        ) || []
      );
    };
    if (query.length > 0) {
      fetchClients();
    }
  }, [queryType, query]);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  const [sendingSMS, setSendingSMS] = useState(false);
  const sendSMS = async () => {
    setSendingSMS(true);
    // @ts-ignore
    const client = data[parseInt(Array.from(selectedKeys)[0]) - 1];
    console.log(client);
    setSendingSMS(false);
    // await axios.post(API_URL + "/api/sms", {
    //   info: "",
    //   recipent: client.phonenumber,
    //   text: "OFB Mobile Login "+client.login,
    // });
  };

  return (
    <Box>
      <SectionHeading mb={10}>Clients</SectionHeading>
      <Stack w="100%" direction="row" spacing={4}>
        <Search
          flex={1}
          query={query}
          setQuery={setQuery}
          queryType={queryType}
          setQueryType={setQueryType}
          mb={6}
        />
        <Button
          onClick={sendSMS}
          isLoading={sendingSMS}
          w="200px"
          colorScheme="blue"
          mt={8}
          ml="auto"
          isDisabled={!Array.from(selectedKeys).length}
        >
          Send SMS
        </Button>
      </Stack>

      {!data.length && !query.length && (
        <EmptyState text="Start typing to search..." />
      )}

      {/* <Flex align="center" justify="center">
          <Spinner />
        </Flex> */}
      {!!data.length && (
        <Box>
          <ClientsTable onSelectionChange={setSelectedKeys} items={data} />
        </Box>
      )}
    </Box>
  );
};

export default Clients;
