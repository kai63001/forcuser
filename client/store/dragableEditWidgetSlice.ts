//react toolkit
import { PomodoroV1State } from "@/components/pomodoro/type/pomodoroV1";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedWidget: ""
};

export const dragableEditWidgetSlice = createSlice({
  name: "dragableEditWidget",
  initialState,
  reducers: {
    setDragableEditWidget: (state, action: PayloadAction<any>) => {
      // console.log("playload", action.payload);
      return action.payload;
    },
  },
});

export const { setDragableEditWidget } = dragableEditWidgetSlice.actions;

export default dragableEditWidgetSlice.reducer;
