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
  file_id: "",
  from: dayjs().toDate(),
  to: dayjs().endOf("month").toDate(),
  items: [],
  cost: 0,
  stores: [],
};
