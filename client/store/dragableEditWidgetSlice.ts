// react toolkit
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  selectedWidget: '',
  toggleId: 0
}

export const dragableEditWidgetSlice = createSlice({
  name: 'dragableEditWidget',
  initialState,
  reducers: {
    setDragableEditWidget: (state, action: PayloadAction<any>) => {
      // console.log("playload", action.payload);
      return action.payload
    }
  }
})

export const { setDragableEditWidget } = dragableEditWidgetSlice.actions

export default dragableEditWidgetSlice.reducer
