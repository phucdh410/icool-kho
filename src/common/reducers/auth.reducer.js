import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  SET_AUTHENTICATE,
  SET_CURRENT_USER,
  SET_PERMISSION,
} from "_common/actions/_types";

const initialState = {
  token: null,
  user: null,
  role: null,
  store_code: null,
  ware_code: null,
  permissions: {},
};

const persistConfig = {
  key: "_auth",
  storage: storage,
  whitelist: ["token"],
};

function authReducer(
  state = initialState,
  { type, payload } = { type: null, payload: null }
) {
  switch (type) {
    case SET_CURRENT_USER:
      return { ...state, user: payload };
    case SET_AUTHENTICATE:
      return { ...state, token: payload };
    case SET_PERMISSION:
      return {
        ...state,
        role: payload.role_code ?? null,
        store_code: payload.store_code ?? null,
        ware_code: payload.ware_code ?? null,
        permissions: payload.permissions ?? {},
      };
    default:
      return state;
  }
}

export default persistReducer(persistConfig, authReducer);
