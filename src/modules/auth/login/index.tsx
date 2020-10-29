import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
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
  useToast,
  Alert,
  Icon,
  AlertIcon,
} from "@chakra-ui/core";
import schema from "./schema";
import Logo from "components/Logo";
import { login } from "store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticatedSelector } from "store/auth/selectors";
import { useHistory } from "react-router-dom";
import { useMessageFormatter } from "@react-aria/i18n";
import strings from "config/strings";
import { FiInfo } from "react-icons/fi";

const Login = () => {
  const toast = useToast();
  const { handleSubmit, errors, register } = useForm<{
    username: string;
    password: string;
  }>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const {
    isOpen: isPasswordShown,
    onToggle: togglePasswordVisibility,
  } = useDisclosure({ defaultIsOpen: false });

  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isAuth = useSelector(isAuthenticatedSelector);
  const history = useHistory();

  const onSubmit = handleSubmit(async ({ username, password }) => {
    setIsSubmitting(true);
    const res = await dispatch(login({ username, password }));

    // @ts-ignore
    if (res.error) {
      toast({
        title: "Unable to login",
        description: "Please, make sure your credentials are correct",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
    }

    setIsSubmitting(false);
  });

  useEffect(() => {
    if (isAuth) {
      history.push("/clients");
    }
    // eslint-disable-next-line
  }, [isAuth]);
  const formatMessage = useMessageFormatter(strings);

  return (
    <Flex bg="blue.100" minHeight="100vh">
      <Flex justify="center" w="40%" maxW="40%" bg="white" height="100vh">
        <Flex mt={-8} justify="center" direction="column" width="400px">
          <Heading mb={6}>{formatMessage("pages.login.heading")}</Heading>
          <Alert status="info" mb={16}>
            <AlertIcon /> Use "admin" for username and password 😉
          </Alert>
          <form onSubmit={onSubmit}>
            <Stack spacing={3}>
              <FormControl
                isRequired={true}
                isInvalid={Boolean(errors.username)}
              >
                <FormLabel htmlFor="username">
                  {formatMessage("pages.login.username")}
                </FormLabel>
                <Input
                  size="lg"
                  type="text"
                  id="username"
                  name="username"
                  ref={register}
                />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired={true}
                isInvalid={Boolean(errors.password)}
              >
                <FormLabel htmlFor="password">
                  {formatMessage("pages.login.password")}
                </FormLabel>
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
                {formatMessage("pages.login.action")}
              </Button>
            </Stack>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
