import { configureStore } from '@reduxjs/toolkit'
import templateSlice from './templateSlice'
import dragableEditWidgetSlice from './dragableEditWidgetSlice'

export const store = configureStore({
  reducer: {
    templateSlice,
    dragableEditWidgetSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch