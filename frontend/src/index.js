import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
// import "./index.css"
import "./assets/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import configureStore from "./app/store";
import { SocketContextProvider } from "./context/SocketContext.jsx";

let store = configureStore({});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
