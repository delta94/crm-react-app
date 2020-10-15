import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
  Tag,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/core";
import { Cell, Row, TableBody, TableHeader } from "@react-stately/table";
import axios from "axios";
import EmptyState from "components/EmptyState";
import SectionHeading from "components/SectionHeading";
import Table from "components/Table";
import Column from "components/Table/Column";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { FiCalendar, FiCheck, FiDownload } from "react-icons/fi";
import { useSelector } from "react-redux";
import { userSelector } from "store/auth/selectors";

interface Item {
  id: string;
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
          <Row key={item.id}>
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
  const [data, setData] = useState<Item[]>([]);
  const [date, setDate] = useState("");
  const isDateValid = dayjs(date).isValid();
  const user = useSelector(userSelector);
  const toast = useToast();
  const canConfirm = data.some((t) => t.state === "CREATED");

  const confirm = async () => {
    setConfirming(true);
    let res;
    try {
      res = await axios(`http://localhost:8081/api/bss-paynet-set/${date}`, {
        headers: { Authorization: `Bearer ${user.token}` },
        method: "PUT",
      });
      if (res.status === 200) {
        toast({
          title: "Successfull confirmed",
          // description: "",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact the developer.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
      console.log(error);
    }

    setConfirming(false);
  };

  const getTransacts = async () => {
    if (!isDateValid) {
      return;
    }
    setLoading(true);

    const res = await axios(
      `http://localhost:8081/api/bss-paynet/${dayjs(date)
        .format("YYYY-MM-DD")
        .toString()}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    // const res = await axios(
    //   `https://5f7ebbb0094b670016b76686.mockapi.io/api/payments`
    // );
    setData(
      res.data?.transacts?.map((t, i) => ({ ...t, id: `${i}${t.docid}` })) || []
    );

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
          isDisabled={!isDateValid}
          isLoading={loading}
          leftIcon={<Icon as={FiDownload} />}
        >
          Get transacts
        </Button>
        <Tooltip
          hasArrow
          placement="top"
          label={canConfirm ? "" : "Already confirmed"}
        >
          <Button
            isLoading={confirming}
            onClick={confirm}
            w="200px"
            colorScheme="green"
            leftIcon={<Icon as={FiCheck} />}
            isDisabled={!canConfirm}
          >
            Confirm
          </Button>
        </Tooltip>
      </Stack>
      <Box pos="relative">
        {!data.length && !isDateValid && (
          <EmptyState text="Enter a valid date to search" />
        )}

        {!data.length && isDateValid && (
          <EmptyState text="Nothing found. Try different a date." />
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

        {!!data.length && <PaymentsTable items={data} />}
      </Box>
    </Box>
  );
};

export default Payments;
