import moment from "moment";

export const format = (date = null, formatString = "DD/MM/yyyy") =>
	moment(date).format(formatString);

export const toDate = (date = null) => moment(date).toDate();
