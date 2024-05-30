import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./musicStore/musicSlice";
import authReducer from "./authStore/authSlice";
import userReducer from "./userStore/userSlice";
// import { saveToLocalStorage } from "./musicStore/musicSlice";

export const store = configureStore({
  reducer: {
    musicStore: musicReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// store.subscribe(() => {
//   const state = store.getState();
//   saveToLocalStorage(state.musicStore);
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
