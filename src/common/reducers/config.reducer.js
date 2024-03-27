import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
	SET_LOADING,
	SET_SIDEBAR,
	SET_TABS,
	PUSH_NOTI,
	REMOVE_NOTI,
} from "_common/actions/_types";

const initialState = {
	isShow: "responsive",
	isLoading: null,
	tabs: [],
	notification: [],
};

const persistConfig = {
	key: "_config",
	storage: storage,
	whitelist: ["tabs"],
};

function configReducer(state = initialState, { type, payload }) {
	switch (type) {
		case SET_LOADING:
			return {
				...state,
				isLoading: payload,
			};
		case SET_SIDEBAR:
			return {
				...state,
				isShow: payload,
			};
		case SET_TABS:
			return {
				...state,
				tabs: payload,
			};
		case PUSH_NOTI:
			return {
				...state,
				notification: [...state.notification, payload],
			};
		case REMOVE_NOTI:
			return {
				...state,
				notification: state.notification.filter((v, i) => i !== payload),
			};
		default:
			return state;
	}
}

export default persistReducer(persistConfig, configReducer);
