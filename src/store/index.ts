import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import gameReducer from './game/gameSlice';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      // .prepend(
      //   // correctly typed middlewares can just be used
      //   additionalMiddleware,
      //   // you can also type middlewares manually
      //   untypedMiddleware as Middleware<
      //     (action: Action<'specialAction'>) => number,
      //     RootState
      //   >,
      // )
      // prepend and concat calls can be chained
      .concat(logger),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
