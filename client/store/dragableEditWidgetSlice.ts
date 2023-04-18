// react toolkit
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// type enum
export interface DragableEditWidget {
  selectedWidget?: string
  toggleId?: '' | 'music' | 'timer' | 'uploadBackground' | 'todolist' | 'setting' | 'edit-music-player-1' | 'edit-music-player-spotify-iframe'
}

const initialState: DragableEditWidget = {
  selectedWidget: '',
  toggleId: ''
}

export const dragableEditWidgetSlice = createSlice({
  name: 'dragableEditWidget',
  initialState,
  reducers: {
    setDragableEditWidget: (state, action: PayloadAction<DragableEditWidget>) => {
      // console.log("playload", action.payload);
      return action.payload
    }
  }
})

export const { setDragableEditWidget } = dragableEditWidgetSlice.actions

export default dragableEditWidgetSlice.reducer
