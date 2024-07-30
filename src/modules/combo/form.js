import dayjs from "dayjs";

export const defaultValues = {
  id: "",
  code: "",
  name: "",
  unit: "",
  goods: [],
};

export const comboDefaultValues = {
  code: "",
  name: "",
  unit: "",
  note: "",
  files: [],
  start: dayjs().toDate(),
  end: dayjs().endOf("month").toDate(),
  combo_items: [],
  cost: 0,
  stores: [],
};
