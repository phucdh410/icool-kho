import moment from "moment";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { CLEAR_TABS, SET_FILTER } from "_common/actions/_types";

export const NAME = "INVENTORY_RETURN";

const initialState = {
  filters: {
    startAt: moment().subtract(7, "days").toDate(),
    endAt: moment().toDate(),
  },
};

const persistConfig = {
  key: "_inventory_return",
  storage: storage,
  blacklist: ["code"],
  migrate: (object, number) => {
    return new Promise((res, rej) =>
      object
        ? res({
            ...object,
            filters: {
              ...object.filters,
              startAt: moment(object.filters.startAt).toDate(),
              endAt: moment(object.filters.endAt).toDate(),
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
          filters: {
            startAt: moment().subtract(7, "days").toDate(),
            endAt: moment().toDate(),
          },
        };
    default:
      return state;
  }
}

export default persistReducer(persistConfig, inventoryAdjustmentReducer);
