import { configureStore } from '@reduxjs/toolkit';
import { codecApi } from './codecApi';

const store = configureStore({
  reducer: {
    [codecApi.reducerPath]: codecApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(codecApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
