import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BaseUrl from "../../constant/BaseUrl";

const initialState = {
  loading: false,
  generatedResult: null,
  error: null,
};

const captionSlice = createSlice({
  name: "caption",
  initialState,
  reducers: {
    fetchPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.generatedResult = action.payload;
    },
    fetchFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearResult: (state) => {
      state.generatedResult = null;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchFailed, clearResult } =
  captionSlice.actions;

export default captionSlice.reducer;

export const generateCaption = (formData) => async (dispatch) => {
  try {
    dispatch(fetchPending());

    const { data } = await axios.post(`${BaseUrl}/captions`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchFailed(error.response?.data?.message || "Error"));
  }
};

export const deleteCaption = (id) => async (dispatch) => {
  try {
    dispatch(fetchPending());

    await axios.delete(`${BaseUrl}/captions/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dispatch(clearResult());
  } catch (error) {
    dispatch(fetchFailed(error.response?.data?.message || "Error"));
  }
};
