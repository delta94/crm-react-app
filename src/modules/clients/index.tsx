import {
  Box,
  Button,
  Flex,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/core";
import { Selection } from "@react-types/shared";
import axios from "axios";
import ClientsTable from "components/ClientsTable";
import EmptyState from "components/EmptyState";
import Search from "components/Search";
import SectionHeading from "components/SectionHeading";
import { API_URL } from "helpers/api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "store/auth/selectors";
import useSWR, { mutate } from "swr";
import { search } from "./search";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Clients = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [queryType, setQueryType] = useState("fullname");
  const [data, setData] = useState([]);
  const user = useSelector(userSelector);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [sendingSMS, setSendingSMS] = useState(false);
  const toast = useToast();

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
          Authorization: "Bearer " + user.token,
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
    } else {
      setData([]);
      setSelectedKeys(new Set());
    }
  }, [queryType, query]);

  const sendSMS = async () => {
    setSendingSMS(true);
    // @ts-ignore
    const client = data.find((c) => c.extid === Array.from(selectedKeys)[0]);

    const res = await axios.post(
      "http://localhost:8081" + "/api/sms",
      {
        recipient: client.mobilephone,
        text:
          "Rekvizity dostupa v Internet-Bank. Vash login: lovinguz. ? / ?Internet-bankga kirish uchun rekvizitlar. Sizning login: " +
          client.login,
      },
      {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      }
    );

    if (res.status === 200) {
      toast({
        title: "Success sent",
        // description: "",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
    } else if (res.status === 403) {
      toast({
        title: "Error",
        description: "You do not have enough permisson to perform this action.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
    } else {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact the developer.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
    }

    setSendingSMS(false);
  };

  return (
    <Box>
      <SectionHeading mb={10}>Clients</SectionHeading>
      <Stack mb={6} w="100%" direction="row" spacing={4}>
        <Search
          flex={1}
          query={query}
          setQuery={setQuery}
          queryType={queryType}
          setQueryType={setQueryType}
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
      <Box pos="relative">
        {!data.length && !query.length && (
          <EmptyState text="Start typing to search..." />
        )}

        {!data.length && !!query.length && (
          <EmptyState text="Nothing found. Try different queries." />
        )}

        {loading && (
          <Flex
            pos="absolute"
            bg="rgba(255,255,255,.5)"
            w="100%"
            h="100%"
            align="center"
            justify="center"
            top={0}
            left={0}
          >
            <Spinner />
          </Flex>
        )}

        {!!data.length && (
          <ClientsTable onSelectionChange={setSelectedKeys} items={data} />
        )}
      </Box>
    </Box>
  );
};

export default Clients;
