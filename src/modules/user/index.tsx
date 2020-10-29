import { Box, Button } from "@chakra-ui/core";
import SectionHeading from "components/SectionHeading";
import { axios } from "helpers/api";
import React from "react";
import { useDispatch } from "react-redux";
import { FLUSH } from "store/actionTypes";

const User = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: FLUSH });
  };
  return (
    <Box>
      <SectionHeading mb={10}>User</SectionHeading>
      <Button colorScheme="blue" onClick={logout}>
        Log out
      </Button>
    </Box>
  );
};

export default User;
