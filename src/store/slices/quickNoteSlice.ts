import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { Navigate } from "react-router-dom";
import { server } from "../../constants";
// import { LoginResult, RegisterResult } from "../../types/auth-result.type";
// import { User } from "../../types/user.type";
import { httpClient } from "../../utils/HttpClient";
import { RootState } from "../store";
import { quickNoteInterface } from "../../utils/Interface";
// const navigate = Navigate();

export interface AuthState {
  quickNote: quickNoteInterface[];
  loading : boolean
  isError : boolean
}

const initialState: AuthState = {
  quickNote: [],
  loading : false,
  isError : false
};

export const getQuickNote = createAsyncThunk("quickNote/getQuickNote", async (value: number) => {
  let result = await httpClient.get<any>(server.QUICK_NOTE+'/'+value);

  if (result.data.message == "success") {
    return result.data.data;
  }

  throw Error();
});
export const addQuickNotes = createAsyncThunk("quickNote/addQuickNotes", async (params: quickNoteInterface) => {
    let result = await httpClient.post<any>(server.QUICK_NOTE, params);
  
    if (result.data.message == "success") {
      return result.data.data;
    }
  
    throw Error();
  });

  export const delQuickNotes = createAsyncThunk("quickNote/delQuickNote", async (params: number) => {
    let result = await httpClient.delete<any>(server.QUICK_NOTE+`/${params}`);
  
    if (result.data.message == "success") {
      return result.data.data;
    }
  
    throw Error();
  });
const quickNoteSlice = createSlice({
  name: "quickNote",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuickNote.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isError = false;
        state.loading = false;
        state.quickNote = action.payload
      });
      builder.addCase(getQuickNote.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getQuickNote.rejected, (state) => {
        state.isError = true;
        state.loading = false;
      });
  },
});

export const {} = quickNoteSlice.actions;
export const quickNoteSelector = (store: RootState) => store.quickNoteReducer;

export default quickNoteSlice.reducer;
