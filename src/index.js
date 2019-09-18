import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./containers/app";
import ErrorBoundry from "./components/error-boundry";
import AviasalesService from "./services/aviasales-service";
import { AviasalesServiceProvider } from "./components/aviasales-service-context";

import store from "./store";

const aviasalesService = new AviasalesService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <AviasalesServiceProvider value={aviasalesService}>
        <App />
      </AviasalesServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);
