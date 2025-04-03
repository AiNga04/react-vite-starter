import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface userState {
  access_token: String;
  refresh_token: String;
  user: {
    address: String;
    age: number;
    email: String;
    gender: String;
    isVerify: boolean;
    name: String;
    role: String;
    type: String;
    username: String;
    _id: String;
  };
}

const initialState = {
  access_token: "",
  refresh_token: "",
  user: {
    address: "",
    age: 0,
    email: "",
    gender: "",
    isVerify: false,
    name: "",
    role: "",
    type: "",
    username: "",
    _id: "",
  },
} satisfies userState as userState;

const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    doLogin(state, action: PayloadAction<any>) {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.user = action.payload.user;
    },
  },
});

export const { doLogin } = userSlice.actions;
export default userSlice.reducer;
