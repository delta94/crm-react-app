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

interface Props extends StackProps {}

const Search: React.FC<Props> = (props) => {
  return (
    <Stack direction="row" spacing={6} {...props}>
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
        />
      </InputGroup>
      <Select label="Favorite Color" defaultSelectedKey="Name">
        <Item key="Name">
          {/* <Icon color="white" as={FiUser} /> */}
          Name
        </Item>
        <Item key="Phone number">Phone number</Item>
        <Item key="Date of birth">Date of birth</Item>
        <Item key="Passport number">Passport number</Item>
        <Item key="INN">INN</Item>
        <Item key="Login">Login</Item>
      </Select>
    </Stack>
  );
};

export default Search;
