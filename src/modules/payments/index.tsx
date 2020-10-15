import {
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/core";
import { Cell, Row, TableBody, TableHeader } from "@react-stately/table";
import axios from "axios";
import SectionHeading from "components/SectionHeading";
import Table from "components/Table";
import Column from "components/Table/Column";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { FiCalendar, FiCheck, FiDownload } from "react-icons/fi";

interface Item {
  providerid: string;
  withdraw: number;
  reward: number;
  purpose: string;
  createdon: string;
  state: string;
}

interface Props {
  items: Item[];
}

const PaymentsTable: React.FC<Props> = (props) => {
  const tableRef = useRef(null);

  return (
    <Table
      aria-label="Table with static contents"
      selectionMode="none"
      width={1000}
      height={400}
      // sortDescriptor={list.sortDescriptor}
      // onSortChange={list.sort}
      ref={tableRef}
    >
      <TableHeader>
        <Column key="purpose" allowsSorting={false}>
          Purpose
        </Column>
        <Column align="end" key="withdraw" width={120} allowsSorting={false}>
          Widthdraw
        </Column>
        <Column
          align="end"
          key="reward"
          width={120}
          isRowHeader
          allowsSorting={false}
        >
          Reward
        </Column>
        <Column key="createdon" width={150} allowsSorting={false}>
          Date
        </Column>
        <Column key="state" width={150} allowsSorting={false}>
          State
        </Column>
      </TableHeader>
      <TableBody items={props.items}>
        {(item) => (
          <Row key={item.providerid}>
            {(key) => (
              <Cell>
                {key === "createdon" ? (
                  dayjs(item[key]).format("YYYY-MM-DD").toString()
                ) : key === "state" ? (
                  <Tag
                    colorScheme={item[key] === "CONFIRMED" ? "green" : "yellow"}
                  >
                    {item[key]}
                  </Tag>
                ) : (
                  item[key]
                )}
              </Cell>
            )}
          </Row>
        )}
      </TableBody>
    </Table>
  );
};

const Payments = () => {
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // const res = await axios.post('localhost:8081'+'/api/bss-paynet')
      const res = await axios(
        "https://5f7ebbb0094b670016b76686.mockapi.io/api/payments"
      );
      setData(res?.data?.transacts || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const confirm = async () => {
    setConfirming(true);
    // const res = await axios()
    setConfirming(false);
  };

  const [date, setDate] = useState("");

  const toast = useToast();
  const getTransacts = async () => {
    if (!dayjs(date).isValid()) {
      return;
    }
    setLoading(true);

    // const res = await axios(`https://5f7ebbb0094b670016b76686.mockapi.io/api/payments/${date}`)
    const res = await axios(
      `https://5f7ebbb0094b670016b76686.mockapi.io/api/payments`
    );
    setData(res.data?.transacts || []);

    if (res.status !== 200) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact the developer.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
    }
    setLoading(false);
  };

  return (
    <Box>
      <SectionHeading mb={10}>Payments</SectionHeading>
      <Stack justify="flex-end" mb={6} direction="row" spacing={4}>
        <InputGroup flexBasis="30%">
          <InputLeftElement
            pointerEvents="none"
            children={<Icon color="gray.400" as={FiCalendar} />}
          />
          <Input
            size="md"
            bg="white"
            color="gray.600"
            placeholder="Type to search"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </InputGroup>
        <Button
          flexBasis="17%"
          colorScheme="blue"
          onClick={getTransacts}
          isDisabled={!dayjs(date).isValid()}
          isLoading={loading}
          leftIcon={<Icon as={FiDownload} />}
        >
          Get transacts
        </Button>
      </Stack>
      <PaymentsTable items={data} />
      <Button
        isLoading={confirming}
        onClick={confirm}
        w="200px"
        colorScheme="blue"
        mt={6}
        ml="auto"
        leftIcon={<Icon as={FiCheck} />}
      >
        Confirm
      </Button>
    </Box>
  );
};

export default Payments;
