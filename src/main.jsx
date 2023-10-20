import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App.jsx";
import mainReducer from "./redux/mainSlice";
import { ThemeProvider } from "./components/context/ThemeContext.jsx";

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});

const root = document.getElementById("root");

const reactRoot = ReactDOM.createRoot(root);

reactRoot.render(
  <Provider store={store}>
    <ThemeProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>
);
