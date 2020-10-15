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
  Tooltip,
  useToast,
} from "@chakra-ui/core";
import { axios } from "helpers/api";
import EmptyState from "components/EmptyState";
import SectionHeading from "components/SectionHeading";
import dayjs from "dayjs";
import React, { useState } from "react";
import { FiCalendar, FiCheck, FiDownload } from "react-icons/fi";
import { PaynetTransaction } from "MyTypes";
import PaynetTable from "components/PaynetTable";

const Payments = () => {
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [data, setData] = useState<PaynetTransaction[]>([]);
  const [date, setDate] = useState("");
  const isDateValid = dayjs(date).isValid();
  const toast = useToast();
  const canConfirm = data.some((t) => t.state === "CREATED");

  const confirm = async () => {
    setConfirming(true);
    let res;
    try {
      res = await axios.put(`/api/bss-paynet-set/${date}`);

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
      `/api/bss-paynet/${dayjs(date).format("YYYY-MM-DD").toString()}`
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

        {!!data.length && <PaynetTable items={data} />}
      </Box>
    </Box>
  );
};

export default Payments;
