import isEmpty from "./isEmpty";

const _filter = (data) => {
	Object.keys(data).forEach((key) => {
		if (isEmpty(data[key])) delete data[key];
		if (typeof data[key] === "object") data[key] = _filter(data[key]);
	});
	return data;
};

export default function filter(data) {
	return _filter(data);
}
