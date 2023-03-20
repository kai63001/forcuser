//react toolkit
import { PomodoroV1State } from "@/components/pomodoro/type/pomodoroV1";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PomodoroV1State = {
  wallpaper: {
    url: "",
    type: 0,
  },
  music: {
    widget: -1,
    type: "",
    url: "",
    position: {
      x: 0,
      y: 0,
    },
  },
  pomodoro: {
    widget: 0,
    position: {
      x: -1,
      y: -1,
    },
  },
  global: {
    position: {
      x: 0,
      y: 0,
    },
  },
};

export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setTemplate: (state, action: PayloadAction<PomodoroV1State>) => {
      // console.log("playload", action.payload);
      return action.payload;
    },
  },
});

export const { setTemplate } = templateSlice.actions;

export default templateSlice.reducer;
