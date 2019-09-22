import React        from "react";
import ReactDOM     from "react-dom";
import { Provider } from "react-redux";

import App          from "./containers/app";
import ErrorBoundry from "./components/error-boundry";

import createStore from "./store";

ReactDOM.render(
	<Provider store={createStore()}>
		<ErrorBoundry>
			<App/>
		</ErrorBoundry>
	</Provider>,
	document.getElementById("root")
);
