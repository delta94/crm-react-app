import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Heading,
  InputGroup,
  useDisclosure,
  InputRightElement,
  Stack,
} from "@chakra-ui/core";
import schema from "./schema";
import Logo from "components/Logo";

const Login = () => {
  const { handleSubmit, errors, register } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const {
    isOpen: isPasswordShown,
    onToggle: togglePasswordVisibility,
  } = useDisclosure({ defaultIsOpen: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit(values) {
    setIsSubmitting(true);

    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <Flex bg="blue.100" minHeight="100vh">
      <Flex justify="center" w="40%" maxW="40%" bg="white" height="100vh">
        <Flex mt={-8} justify="center" direction="column" width="400px">
          <Logo mb={3} />
          <Heading mb={16}>Welcome back</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <FormControl isRequired={true} isInvalid={Boolean(errors.email)}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  size="lg"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@example.com"
                  ref={register}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired={true}
                isInvalid={Boolean(errors.password)}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup size="lg">
                  <Input
                    size="lg"
                    id="password"
                    name="password"
                    type={isPasswordShown ? "text" : "password"}
                    placeholder="********"
                    ref={register}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      px={6}
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordShown ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <Button
                isFullWidth
                mt={4}
                colorScheme="blue"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
