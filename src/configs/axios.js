import axios from "axios";

import { logout } from "_common/actions/auth.action";
import { store } from "src/store";

axios.interceptors.response.use(
	function (response) {
		if (response.data.type)
			return Promise.resolve({ data: response.data, status: true });
		return Promise.resolve({ ...response.data, status: true });
	},
	function (error) {
		if (error.response.status === 401) store.dispatch(logout());
		noti("error", err.response.data.message);
		return Promise.resolve({ ...error.response.data, status: false });
	}
);
