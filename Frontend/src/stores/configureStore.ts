import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./musicStore/musicSlice";
import authReducer from "./authStore/authSlice";
import userReducer from "./userStore/userSlice";

export const store = configureStore({
  reducer: {
    musicInStore: musicReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
