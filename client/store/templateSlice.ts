// react toolkit
import { type PomodoroV1State } from '@/components/pomodoro/type/pomodoroV1'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: PomodoroV1State = {
  wallpaper: {
    url: '',
    type: 0
  },
  music: {
    widget: -1,
    type: '',
    url: '',
    position: {
      x: 0,
      y: 0
    },
    draging: ''
  },
  pomodoro: {
    widget: -1,
    theme: {
      backgroundColor: '#000000',
      opacity: 1
    },
    position: {
      x: -1,
      y: -1
    },
    draging: ''
  },
  global: {
    position: {
      x: 0,
      y: 0
    }
  },
  todolist: {
    position: {
      x: -1,
      y: -1
    }
  }
}

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
