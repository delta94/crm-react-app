import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("No email provided"),
  password: yup.string().required("No password provided"),
});

export default schema;
