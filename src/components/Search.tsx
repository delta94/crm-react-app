import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  StackProps,
} from "@chakra-ui/core";
import { useMessageFormatter } from "@react-aria/i18n";
import { Item } from "@react-stately/collections";
import strings from "config/strings";
import React from "react";
import { FiCalendar, FiHash, FiPhone, FiUser } from "react-icons/fi";
import Select from "./Select";

interface Props extends StackProps {
  query: string;
  queryType: string;
  setQuery: (value: string) => void;
  setQueryType: (value: string) => void;
}

const icons = {
  fullname: FiUser,
  dateofbirth: FiCalendar,
  mobilephone: FiPhone,
  login: FiUser,
  passnumber: FiHash,
  inn: FiHash,
};

const Search: React.FC<Props> = ({
  query,
  queryType,
  setQuery,
  setQueryType,
  ...otherProps
}) => {
  const formatMessage = useMessageFormatter(strings);

  return (
    <Stack direction="row" spacing={4} {...otherProps}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon color="gray.400" as={icons[queryType]} />}
        />
        <Input
          size="md"
          bg="white"
          color="gray.600"
          type={queryType === "dateofbirth" ? "date" : "text"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputGroup>
      <Select
        label={formatMessage("components.clientSearch.searchBy")}
        selectedKey={queryType}
        onSelectionChange={setQueryType}
      >
        <Item aria-label="Full name" key="fullname">
          {formatMessage("components.clientSearch.name")}
        </Item>
        <Item aria-label="Phone number" key="mobilephone">
          {formatMessage("components.clientSearch.phonenumber")}
        </Item>
        <Item aria-label="Date of birth" key="dateofbirth">
          {formatMessage("components.clientSearch.dateofbirth")}
        </Item>
        <Item aria-label="Passport number" key="passnumber">
          {formatMessage("components.clientSearch.passnumber")}
        </Item>
        <Item aria-label="INN" key="inn">
          {formatMessage("components.clientSearch.inn")}
        </Item>
        <Item aria-label="Login" key="login">
          {formatMessage("components.clientSearch.login")}
        </Item>
      </Select>
    </Stack>
  );
};

export default Search;
