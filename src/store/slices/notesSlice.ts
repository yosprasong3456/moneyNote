import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server } from "../../constants";
import { httpClient } from "../../utils/HttpClient";
import { RootState } from "../store";

interface myNotes {
  id?: number,
  mType: string,
  mPrice: number,
  saveDate?: string,
  mNote: string,
  status: string,
  userId: number
}
export interface NoteState {
  notes : myNotes[]
  loading : boolean
  isError : boolean
}

const initialState: NoteState = {
  notes : [],
  loading : false,
  isError : false
};

export const getMyNotes = createAsyncThunk("notes/getMyNotes", async (value: any) => {
  let result = await httpClient.get<any>(server.MY_NOTES+"/"+value);

  if (result.data.message == "success") {
    return result.data.data;
  }

  throw Error();
});

export const addMyNotes = createAsyncThunk("notes/addMyNotes", async (params: myNotes) => {
  let result = await httpClient.post<any>(server.MY_NOTES, params);

  if (result.data.message == "success") {
    return result.data.data;
  }

  throw Error();
});

export const delMyNotes = createAsyncThunk("notes/delMyNotes", async (params: string) => {
  let result = await httpClient.delete<any>(server.MY_NOTES+`/${params}`);

  if (result.data.message == "success") {
    return result.data.data;
  }

  throw Error();
});


const noteSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getMyNotes.fulfilled, (state, action) => {
      console.log(action.payload)
      state.isError = false;
      state.loading = false;
      state.notes = action.payload
    });
    builder.addCase(getMyNotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMyNotes.rejected, (state) => {
      state.isError = true;
      state.loading = false;
    });

    builder.addCase(addMyNotes.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addMyNotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addMyNotes.rejected, (state) => {
      state.loading = false;
    });
    
  },
});

export const {  } = noteSlice.actions;
export const noteSelector = (store: RootState) => store.noteReducer;

export default noteSlice.reducer;
