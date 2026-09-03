import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { blogApi } from "../services/blogApi";
import { contactApi } from "../services/contactMessage";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware, contactApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
