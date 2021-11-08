import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";

import { getUserInfo } from "../../shared/api/userPageApi";

const getUserInfoDB = createAsyncThunk(
  "userpage/userinfo",
  async (data, thunkAPI) => {
    const response = await getUserInfo(data);
    console.log("asyncThunk 통신됨.");

    return response.data;
  }
);

export { getUserInfoDB };
