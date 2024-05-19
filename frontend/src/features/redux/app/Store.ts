// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/Reducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
