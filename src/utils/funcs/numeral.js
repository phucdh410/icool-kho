import numeral from "numeral";

export const money = (value) => numeral(value ?? 0).format("0,0");
