import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slice'
import {shfSlice} from './shf/shfslicer'



export const store = configureStore({
  reducer: {
     counter: counterSlice.reducer,
     shfSlice: shfSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch