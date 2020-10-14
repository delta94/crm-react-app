import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  StackProps,
} from "@chakra-ui/core";
import { Item } from "@react-stately/collections";
import React from "react";
import { FiUser } from "react-icons/fi";
import Select from "./Select";

interface Props extends StackProps {
  query: string;
  queryType: string;
  setQuery: (value: string) => void;
  setQueryType: (value: string) => void;
}

const Search: React.FC<Props> = ({
  query,
  queryType,
  setQuery,
  setQueryType,
  ...otherProps
}) => {
  return (
    <Stack direction="row" spacing={6} {...otherProps}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon color="gray.400" as={FiUser} />}
        />
        <Input
          size="md"
          bg="white"
          color="gray.600"
          placeholder="Type to search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputGroup>
      <Select
        label="Favorite Color"
        defaultSelectedKey="name"
        selectedKey={queryType}
        onSelectionChange={setQueryType}
      >
        <Item key="name">
          {/* <Icon color="white" as={FiUser} /> */}
          Name
        </Item>
        <Item key="phonenumber">Phone number</Item>
        <Item key="dateofbirth">Date of birth</Item>
        <Item key="passportnumber">Passport number</Item>
        <Item key="inn">INN</Item>
        <Item key="login">Login</Item>
      </Select>
    </Stack>
  );
};

export default Search;
