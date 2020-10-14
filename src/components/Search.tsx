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
    <Stack direction="row" spacing={4} {...otherProps}>
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
        defaultSelectedKey="fullname"
        selectedKey={queryType}
        onSelectionChange={setQueryType}
      >
        <Item aria-label="Full name" key="fullname">
          {/* <Icon color="white" as={FiUser} /> */}
          Name
        </Item>
        <Item aria-label="Phone number" key="phonenumber">
          Phone number
        </Item>
        <Item aria-label="Date of birth" key="dateofbirth">
          Date of birth
        </Item>
        <Item aria-label="Passport number" key="passportnumber">
          Passport number
        </Item>
        <Item aria-label="INN" key="inn">
          INN
        </Item>
        <Item aria-label="Login" key="login">
          Login
        </Item>
      </Select>
    </Stack>
  );
};

export default Search;
