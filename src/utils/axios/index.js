import axios from "axios";
import { store } from "src/store";

const CancelToken = axios.CancelToken;
let source = CancelToken.source();

//#region Options
export const FORM_HEADER_JSON = { "Content-Type": "application/json" };
export const FORM_HEADER_FORMDATA = { "Content-Type": "multipart/form-data" };
export const FORM_HEADER_ENCODED = {
  "Content-Type": "application/x-www-form-urlencoded",
};
export const FORM_HEADER_EXCEL = {
  "Content-Type":
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};
//#endregion

// cancel fetch request
export async function cancel() {
  source.cancel();
  source = CancelToken.source();
}

// fetch: method = get
export async function get(url, options = { headers: FORM_HEADER_JSON }) {
  try {
    return await axios.get(url, {
      ...options,
      cancelToken: source.token,
      timeout: 100000,
    });
  } catch (err) {
    if (err?.response?.status === 401) store.dispatch(logout());
    return null;
  }
}

// fetch: method = post
export async function post(url, body, options = { headers: FORM_HEADER_JSON }) {
  try {
    return await axios.post(url, body, {
      ...options,
      cancelToken: source.token,
      timeout: 100000,
    });
  } catch (err) {
    return err?.response;
  }
}

// fetch: method = put
export async function put(url, body, options = { headers: FORM_HEADER_JSON }) {
  try {
    return await axios.put(url, body, {
      ...options,
      cancelToken: source.token,
      timeout: 100000,
    });
  } catch (err) {
    return null;
  }
}

// fetch: method = delete
export async function _delete(url, options = { headers: FORM_HEADER_JSON }) {
  try {
    return axios.delete(url, { ...options, cancelToken: source.token });
  } catch (err) {
    return null;
  }
}

export function map(cb, _default = null) {
  return {
    get: async (...params) => cb((await get(...params)) || _default),
    post: async (...params) => cb((await post(...params)) || _default),
    put: async (...params) => cb((await put(...params)) || _default),
    delete: async (...params) => cb((await _delete(...params)) || _default),
  };
}

// set Authentication Token-Based
export function setAuthToken(token) {
  if (token) axios.defaults.headers.common["x-access-token"] = token;
  // Apply to every request
  else delete axios.defaults.headers.common["x-access-token"]; // Delete auth header
}
