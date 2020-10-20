import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SlideFade,
  Spinner,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/core";
import { useMessageFormatter } from "@react-aria/i18n";
import { Selection } from "@react-types/shared";
import { axios } from "helpers/api";
import ClientsTable from "components/ClientsTable";
import EmptyState from "components/EmptyState";
import Search from "components/Search";
import SectionHeading from "components/SectionHeading";
import strings from "config/strings";
import { API_URL } from "helpers/api";
import React, { useEffect, useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import { useSelector } from "react-redux";
import { userSelector } from "store/auth/selectors";
import { search } from "./search";
import ComboButton from "components/ComboButton";
import { Item } from "@react-stately/collections";

const actionIcons = {
  sendLogin: FiMail,
  changePhoneNumber: FiPhone,
};

const Clients = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [queryType, setQueryType] = useState("fullname");
  const [data, setData] = useState([]);
  const user = useSelector(userSelector);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [sendingSMS, setSendingSMS] = useState(false);
  const toast = useToast();
  const formatMessage = useMessageFormatter(strings);
  const [actionType, setActionType] = useState("sendLogin");
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      const res = await search(`${API_URL}/api/client`, {
        method: "POST",
        data: { [queryType]: query },
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });

      setLoading(false);
      setData(
        res?.data?.clients?.filter(
          (c) => c.extid !== null && c.mobilephone !== null
        ) || []
      );
    };

    if (query.length > 0) {
      fetchClients();
    } else {
      setData([]);
      setSelectedKeys(new Set());
    }
  }, [queryType, query, user.token]);

  const sendSMS = async () => {
    setSendingSMS(true);
    // @ts-ignore
    const client = data.find((c) => c.extid === Array.from(selectedKeys)[0]);

    const res = await axios.post("/api/sms", {
      recipient: client.mobilephone,
      text: `Rekvizity dostupa v Internet-Bank. Vash login: ${client.login}. ? / ?Internet-bankga kirish uchun rekvizitlar. Sizning login: ${client.login}`,
    });

    if (res.status === 200) {
      toast({
        title: "Success sent",
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

  const changePhoneNumber = () => {
    toast({
      title: "Successfully changed",
      status: "success",
      duration: 4000,
      isClosable: true,
      position: "bottom-right",
    });
    onClose();
  };

  const actions = {
    sendLogin: sendSMS,
    changePhoneNumber: onOpen,
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <SlideFade timeout={150} in={isOpen} unmountOnExit={false}>
            {(styles) => (
              <ModalContent style={styles}>
                <ModalHeader>Update phone number</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl id="newPhoneNumber">
                    <FormLabel>New phone number</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children="+998" />
                      <Input
                        type="phone"
                        borderLeftRadius="0"
                        placeholder="phone number"
                      />
                    </InputGroup>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button onClick={changePhoneNumber} colorScheme="blue">
                    Update
                  </Button>
                </ModalFooter>
              </ModalContent>
            )}
          </SlideFade>
        </ModalOverlay>
      </Modal>

      <SectionHeading mb={10}>
        {formatMessage("pages.clients.heading")}
      </SectionHeading>

      <Stack mb={6} w="100%" direction="row" spacing={4}>
        <Search
          flex={1}
          query={query}
          setQuery={setQuery}
          queryType={queryType}
          setQueryType={setQueryType}
        />

        <ComboButton
          onSelectionChange={(key: string) => setActionType(key)}
          selectedKey={actionType}
          leftIcon={<Icon as={actionIcons[actionType]} />}
          onClick={actions[actionType]}
          isDisabled={!Array.from(selectedKeys).length}
          isLoading={sendingSMS}
        >
          <Item
            aria-label={formatMessage("pages.clients.sendSMS")}
            key="sendLogin"
          >
            {formatMessage("pages.clients.sendSMS")}
          </Item>
          <Item aria-label="Change phone number" key="changePhoneNumber">
            Change phone number
          </Item>
        </ComboButton>
      </Stack>

      <Box pos="relative">
        {!data.length && !query.length && (
          <EmptyState text={formatMessage("pages.clients.empty")} />
        )}

        {!data.length && !!query.length && (
          <EmptyState text={formatMessage("pages.clients.nothingFound")} />
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
            zIndex={99}
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
