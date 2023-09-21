import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import moment from "moment";

import { CLEAR_TABS, SET_FILTER } from "_common/actions/_types";

export const NAME = "IMPORT_PRINT";

const initialState = {
	filters: {
		date: moment().toDate(),
	},
};

const persistConfig = {
	key: "_import_print",
	storage: storage,
	blacklist: ["code"],
	migrate: (object, number) => {
		return new Promise((res, rej) =>
			object
				? res({
						...object,
						filters: {
							...object.filters,
							startAt: object.filters.startAt
								? moment(object.filters.startAt).toDate()
								: object.filters.startAt,
							endAt: object.filters.endAt
								? moment(object.filters.endAt).toDate()
								: object.filters.endAt,
							date: object.filters.date
								? moment(object.filters.date).toDate()
								: object.filters.date,
						},
				  })
				: res(object)
		);
	},
};

function exportPrintReducer(
	state = initialState,
	{ type, payload } = { type: null, payload: null }
) {
	switch (type) {
		case SET_FILTER:
			if (payload.component === NAME)
				return { ...state, filters: payload.filters };
		case CLEAR_TABS:
			if (payload.component === NAME || payload === "ALL") {
				return {
					...state,
					filters: {
						date: moment().toDate(),
					},
				};
			}
		default:
			return state;
	}
}

export default persistReducer(persistConfig, exportPrintReducer);
