import { configureStore } from '@reduxjs/toolkit';
import codecReducer from './codecsSlice';

const store = configureStore({
  reducer: {
    codecs: codecReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
