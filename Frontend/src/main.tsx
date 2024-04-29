//import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./configureStore/configureStore.ts";
import "./styles/progress-bar.css";
import { AuthProvider } from "./authStore/AuthStore.tsx";

//TODO, kommentera fram strictmode när byggt klart
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
  // </React.StrictMode>,
);
