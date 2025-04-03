import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
