import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { persistStore } from "reduxjs-toolkit-persist";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/ionicons.min.css";
import "./assets/scss/style.scss";

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
