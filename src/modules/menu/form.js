import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { object } from "yup";

export const defaultValues = {
  name: "",
  status: 1,
  date: dayjs().toDate(),
  holiday: false,
  from: 1,
  to: 5,
  stores: [],
};

export const resolver = yupResolver(object({}));
