import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Navigate } from "react-router-dom";
import { server } from "../../constants";
// import { LoginResult, RegisterResult } from "../../types/auth-result.type";
// import { User } from "../../types/user.type";
import { httpClient } from "../../utils/HttpClient";
import { RootState } from "../store";
// const navigate = Navigate();
export interface AuthState {
  // loginResult?: LoginResult;
  // registerResult?: RegisterResult;
  isAuthenticating: boolean;
  isAuthented: boolean;
  isError: boolean;
  authData: any;
  themeMode: boolean;
}

const initialState: AuthState = {
  isAuthenticating: false,
  isAuthented: false,
  isError: false,
  authData: null,
  themeMode: localStorage.getItem("THEME_MODE") == "dark" ? true : false,
};

export const login = createAsyncThunk("auth/login", async (value: any) => {
  let result = await httpClient.post<any>(server.LOGIN_URL, value);
  console.log(result.data.data);
  const val = result.data.data.token;
  console.log("token", val);
  localStorage.setItem(server.TOKEN_KEY, val);
  if (result.data.message == "success") {
    return result.data;
  }

  throw Error();
});

export const relogin = createAsyncThunk("auth/relogin", async () => {
  let result = await httpClient.get<any>(server.LOGIN_URL);
  console.log("relogin", result.data.data);
  const val = result.data.data.token;
  console.log("token", val);
  localStorage.setItem(server.TOKEN_KEY, val);
  if (result.data.message == "success") {
    return result.data;
  }

  throw Error();
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload.message == "success") {
        state.isAuthented = true;
        state.isError = false;
        state.authData = action.payload;
      } else {
        state.isError = true;
        state.isAuthented = false;
      }
      state.isAuthenticating = false;
    });

    // login
    builder.addCase(login.pending, (state) => {
      state.isAuthenticating = true;
    });

    builder.addCase(login.rejected, (state) => {
      state.isError = true;
      state.isAuthenticating = false;
    });

    builder.addCase(relogin.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload.message == "success") {
        state.isAuthented = true;
        state.isError = false;
        state.authData = action.payload;
      } else {
        state.isError = true;
        state.isAuthented = false;
      }
      state.isAuthenticating = false;
    });
    builder.addCase(relogin.pending, (state) => {
      state.isAuthenticating = true;
    });

    builder.addCase(relogin.rejected, (state) => {
      state.isError = true;
      state.isAuthenticating = false;
    });
  },
});

export const {} = authSlice.actions;
export const authSelector = (store: RootState) => store.authReducer;

export default authSlice.reducer;
