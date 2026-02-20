import { configureStore } from "@reduxjs/toolkit";
import captionReducer from "../features/caption/captionSlice";

export const store = configureStore({
  reducer: {
    caption: captionReducer,
  },
});
