import dayjs from "dayjs";

export const KY_DANH_GIA_OPTIONS = Array(20)
  .fill("")
  .map((e, index) => ({ value: index + 1, label: index + 1 }));

let YEAR_OPTIONS = [];
const currentYear = dayjs().year();
const minYear = currentYear - 20;
const maxYear = currentYear + 30;

for (let i = minYear; i < maxYear; i++) {
  YEAR_OPTIONS.push({ value: i, label: i });
}

export { YEAR_OPTIONS };
