import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import subscribeActionMiddleware from "redux-subscribe-action";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import rootReducer from "_common/reducers";

import { toggleLoading, pushNoti } from "_common/actions/config.action";

const initialState = {};

const middleware = [thunk, subscribeActionMiddleware];

const persistConfig = {
	key: "root",
	storage: storage,
	whitelist: [],
	stateReconciler: autoMergeLevel2,
};

const modules = {
	...require("_modules/import/reducers").default,
	...require("_modules/export/reducers").default,
	...require("_modules/purchase_proposal_form/reducers").default,
	...require("_modules/inventory/reducers").default,
	...require("_modules/summary/reducers").default,
};

const rootReducers = persistReducer(
	persistConfig,
	combineReducers({ ...rootReducer, ...modules })
);

const store = createStore(
	rootReducers,
	initialState,
	compose(
		applyMiddleware(...middleware),
		(window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__()) ||
			compose
	)
);

const persistor = persistStore(store);

window.loading = (isLoading = false) =>
	store.dispatch(toggleLoading(isLoading));

window.noti = (status, title, message) =>
	store.dispatch(pushNoti(status, title, message));

export { store, persistor };
