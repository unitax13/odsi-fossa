import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import memoService from "./memoService";

// const {marked} = require('marked')
// const createDomPurify = require('dompurify')
// const {JSDOM} = require('jsdom')
// const dompurify = createDomPurify(new JSDOM().window)

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  memos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMemo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMemo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.memos.push(action.payload);
      })
      .addCase(createMemo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMemos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMemos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.memos = action.payload;
      })
      .addCase(getMemos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMemo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMemo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.memos = state.memos.filter(
          (memo) => memo._id !== action.payload.id
        );
      })
      .addCase(deleteMemo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateMemo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMemo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.memos = state.memos.map( (memo) => {
          if (memo._id === action.payload._id) {
            memo.markdown = action.payload.markdown;
            // memo.sanitizedHtml = action.payload.markdown; //"freshly editted" //dompurify.sanitize(marked(action.payload.markdown));
          }
          return memo;
        })
      })
      .addCase(updateMemo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

//create new memo
export const createMemo = createAsyncThunk(
  "memos/create",
  async (memoData, thunkAPI) => {
    try {
      console.log("create memos in slice")
      const token = thunkAPI.getState().auth.user.token;
      return await memoService.createMemo(memoData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get user memos
export const getMemos = createAsyncThunk(
  "memos/getAll",
  async (_, thunkAPI) => {
    try {
      // console.log("get memos in slice")
      const token = thunkAPI.getState().auth.user.token;
      return await memoService.getMemos(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//delete user memo
export const deleteMemo = createAsyncThunk(
  "memos/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await memoService.deleteMemo(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//update user memo
export const updateMemo = createAsyncThunk(
  "memos/update",
  async (a, thunkAPI) => {
    try {
      // console.log("update memo in slice with a of " + a.markdown + " " + a.id)
      const token = thunkAPI.getState().auth.user.token;
      return await memoService.updateMemo(a, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const { reset } = memoSlice.actions;
export default memoSlice.reducer;
