import moment from "moment";

export const exportDefaultValues = {
  id: "",
  store_code: "",
  date: moment().toDate(),
  phone_number: "",
  note: "",
  materials: [
    {
      checked: false,
      material_code: "",
      ware_q: 1,
      unit: "",
      price: 0,
      total: 0,
      note: "",
    },
  ],
};
