// react toolkit
import { type PomodoroV1State } from '@/components/pomodoro/type/pomodoroV1'
import { templateDefalut } from '@/lib/templateDefalut'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: PomodoroV1State = templateDefalut

export const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplate: (state, action: PayloadAction<PomodoroV1State>) => {
      // console.log("playload", action.payload);
      return action.payload
    }
  }
})

export const { setTemplate } = templateSlice.actions

export default templateSlice.reducer
