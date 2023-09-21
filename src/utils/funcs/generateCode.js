/* eslint-disable eqeqeq */
import moment from "moment";

let _prev_uid_ = "";

export const generate = (code) => {
	return code && `PT${code}${moment().format("yyyyMMDDHHmmss")}`;
};

export const UID = (_pre = "UID") => {
	const uid = `${_pre}_${moment().format("yyyyMMDDHHmmss")}`;

	const [_uid, count] = _prev_uid_.split("-");

	if (uid == _uid) return (_prev_uid_ = `${uid}-${parseInt(count) + 1}`);

	return (_prev_uid_ = `${uid}-0`);
};
