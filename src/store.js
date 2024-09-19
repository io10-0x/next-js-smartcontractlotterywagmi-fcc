import { configureStore } from "@reduxjs/toolkit";
import exampleSlice from "./slices/exampleSlice"; // Your slice

const store = configureStore({
  reducer: {
    example: exampleSlice, // Add your slice reducer here
  },
});

export default store;
