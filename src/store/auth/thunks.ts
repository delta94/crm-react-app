import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sleep } from "helpers/sleep";

export const login = createAsyncThunk<
  { token: string },
  { username: string; password: string }
>("auth/login", async ({ username, password }) => {
  // const res = await axios.post('/user', {
  //   firstName: 'Fred',
  //   lastName: 'Flintstone'
  // })

  // return res.data

  await sleep(500);
  //   {
  //     "timestamp": "2020-10-06T09:39:56.331+00:00",
  //     "status": 401,
  //     "error": "Unauthorized",
  //     "message": "",
  //     "path": "/api/userInfo"
  // }

  // const res = {status:200}
  // if(res.status===401) {
  // }
  throw Error("Unauthorized");
  return {
    token:
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYwMTk4MTU1MSwiaWF0IjoxNjAxOTYzNTUxfQ.rpJmPeMbezCW9NsC9mvAJ9B76kK6VxoDy8T3JuzDtpfCNypWHAbmbB9I8gMNT7Xl1uIR_IyeAHE-qIMYuBze8Q",
  };
});
