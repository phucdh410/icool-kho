import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";

export const defaultValues = {
  code: "",
  ky_danh_gia: 1,
  year: dayjs().year(),
  note: "",
  date: dayjs().toDate(),
};

export const resolver = yupResolver(object({}));
