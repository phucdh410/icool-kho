import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "_configs/polyfill";

import "core-js";
import "_configs";

import "_configs/axios";
import "_configs/ability";

import React from "react";
import ReactDom from "react-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "src/App";

import AbilityProvider from "_utils/ability";
import QueryClientProvider from "_utils/react-query";

import { store, persistor } from "src/store";

const Render = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AbilityProvider>
					<QueryClientProvider>
						<App />
					</QueryClientProvider>
				</AbilityProvider>
			</PersistGate>
		</Provider>
	);
};

ReactDom.render(<Render />, document.getElementById("root"));
