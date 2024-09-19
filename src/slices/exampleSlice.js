import { createSlice } from "@reduxjs/toolkit";

const exampleSlice = createSlice({
  name: "example",
  initialState: {
    value: 0, // Define your initial state here
  },
  reducers: {
    increment: (state) => {
      state.value += 1; // Increment the value
    },
    decrement: (state) => {
      state.value -= 1; // Decrement the value
    },
    setValue: (state, action) => {
      state.value = action.payload; // Set the value based on the action payload
    },
  },
});

// Export the actions to dispatch them from components
export const { increment, decrement, setValue } = exampleSlice.actions;

// Export the reducer to add to the store
export default exampleSlice.reducer;
