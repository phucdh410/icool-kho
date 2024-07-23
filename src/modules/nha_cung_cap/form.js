import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";

export const defaultValues = {
  code: "",
  cycle: 1,
  year: dayjs().year(),
  note: "",
  evaluation_date: dayjs().toDate(),
  suppliers: [],
};

export const resolver = yupResolver(object({}));
