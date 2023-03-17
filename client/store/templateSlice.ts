//react toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const templateSlice = createSlice({
  name: "template",
  initialState: {
    template: {
      name: "template",
    },
  },
  reducers: {
    setTemplate: (state, action: PayloadAction<any>) => {
      state.template = action.payload;
    },
  },
});

export const { setTemplate } = templateSlice.actions;

export default templateSlice.reducer;
