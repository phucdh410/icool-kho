import dayjs from "dayjs";

export const defaultValues = {
  store_code: "",
  ware_code: "",
  group_code: "",
  checked: dayjs().toDate(),
  value: 0,
  note: "",
  materials: [
    {
      checked: false,
      code: "",
      ware_unit: "",
      ware_q: 1,
      unit: "",
      quantity: 1,
      price: 0,
    },
  ],
};
