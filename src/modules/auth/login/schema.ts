import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required("No username provided"),
  password: yup.string().required("No password provided"),
});

export default schema;
