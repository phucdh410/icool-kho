import moment from "moment";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { CLEAR_TABS, SET_FILTER } from "_common/actions/_types";

export const NAME = "INVENTORY_SLIP_INSTANCE";

const initialState = {
	filters: {
		date: moment().toDate(),
	},
};

const persistConfig = {
	key: "_inventory_slip_instance",
	storage: storage,
	blacklist: ["code"],
	migrate: (object, number) => {
		return new Promise((res, rej) =>
			object
				? res({
						...object,
						filters: {
							...object.filters,
							date: moment(object.filters.date).toDate(),
						},
				  })
				: res(object)
		);
	},
};

function inventoryAdjustmentReducer(
	state = initialState,
	{ type, payload } = { type: null, payload: null }
) {
	switch (type) {
		case SET_FILTER:
			if (payload.component === NAME)
				return { ...state, filters: payload.filters };
		case CLEAR_TABS:
			if (payload.component === NAME || payload === "ALL")
				return {
					...state,
					filters: { date: moment().toDate() },
				};
		default:
			return state;
	}
}

export default persistReducer(persistConfig, inventoryAdjustmentReducer);
