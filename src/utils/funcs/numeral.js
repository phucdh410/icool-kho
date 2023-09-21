import numeral from "numeral";

export const money = (value) => numeral(value).format("0,0");
