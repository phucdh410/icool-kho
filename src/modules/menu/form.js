import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";

export const defaultValues = {
  name: "",
  status: 1,
  date: dayjs().toDate(),
  holiday: false,
  from: 2,
  to: 6,
  stores: [],
};

export const resolver = yupResolver(object({}));