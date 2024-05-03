import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./musicStore/musicSlice";
import authReducer from "./authStore/authSlice";
import userReducer from "./userStore/userSlice";
// import { saveToLocalStorage } from "./musicStore/musicSlice";

export const store = configureStore({
  reducer: {
    musicInStore: musicReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

//Prenumererar på förändringar i min store för att uppdatera localstorage
// store.subscribe(() => {
//   const state = store.getState();
//   saveToLocalStorage(state.musicInStore);
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
