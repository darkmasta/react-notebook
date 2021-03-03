import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { createStore } from "redux";
import documentListReducer from "./reducers";
import { Provider } from "react-redux";

const store = createStore(
  documentListReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
