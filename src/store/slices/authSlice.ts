import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { Navigate } from "react-router-dom";
import { server } from "../../constants";
// import { LoginResult, RegisterResult } from "../../types/auth-result.type";
// import { User } from "../../types/user.type";
import { httpClient } from "../../utils/HttpClient";
import { RootState } from "../store";
import { authDataInterface, mDashboardInterface } from "../../utils/Interface";
// const navigate = Navigate();

export interface AuthState {
  // loginResult?: LoginResult;
  // registerResult?: RegisterResult;
  isAuthenticating: boolean;
  isAuthented: boolean;
  isError: boolean;
  authData: authDataInterface;
  themeMode: boolean;
  isLoadSum: boolean
  isRegister: boolean
  mDashboard: mDashboardInterface
}

let auth = {
  id: 0,
  username: '',
  fullName: '',
  userAvatar: '',
  inActive: '',
  dateStartNote: '',
  token: ''
}

const initialState: AuthState = {
  isAuthenticating: false,
  isAuthented: false,
  isError: false,
  authData: auth,
  themeMode: localStorage.getItem("THEME_MODE") == "dark" ? true : false,
  isLoadSum: false,
  isRegister: false,
  mDashboard: {}
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
  const val = result.data.data.token;
  console.log("token", val);
  localStorage.setItem(server.TOKEN_KEY, val);
  if (result.data.message == "success") {
    return result.data;
  }

  throw Error();
});


export const mDashboard = createAsyncThunk("auth/mDashboard", async (value: any) => {
  let result = await httpClient.get<any>(server.SUM_DASHBOARD+'/'+value);
  
  if (result.data.message == "success") {
    return result.data;
  }

  throw Error();
});

export const register = createAsyncThunk("auth/register", async (value: any) => {
  let result = await httpClient.post<any>(server.REGISER, value);
  console.log(result.data.data);
  
  if (result.data.message == "success") {
    const val = result.data.data.token;
    console.log("token", val);
    localStorage.setItem(server.TOKEN_KEY, val);
    return result.data;
  }

  throw Error();
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state: AuthState) => {
      localStorage.removeItem(server.TOKEN_KEY);
      state.isAuthented = false;
      // navigate.push('/login')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload.message == "success") {
        state.isAuthented = true;
        state.isError = false;
        state.authData = action.payload.data;
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
        state.authData = action.payload.data;
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

    builder.addCase(mDashboard.fulfilled, (state, action) => {
      state.mDashboard = action.payload.data
      state.isLoadSum = false;
    });
    builder.addCase(mDashboard.pending, (state) => {
      state.isLoadSum = true;
    });
    builder.addCase(mDashboard.rejected, (state) => {
      state.isLoadSum = false;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      console.log('sssw',action.payload);
      if (action.payload.message == "success") {
        state.isAuthented = true;
        state.isError = false;
        state.authData = action.payload.data;
      } else {
        state.isError = true;
        state.isAuthented = false;
      }
      state.isAuthenticating = false;
    });
      
    builder.addCase(register.pending, (state) => {
      state.isAuthenticating = true;
    });
    builder.addCase(register.rejected, (state) => {
      state.isAuthenticating = false;
    });
  },
});

export const { logout } = authSlice.actions;
export const authSelector = (store: RootState) => store.authReducer;

export default authSlice.reducer;
