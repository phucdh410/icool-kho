import { useState } from "react";
import moment from "moment";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import MForm from "../../components/Form";

import { create } from "src/apis/export_slip.api";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";
import { correctExport } from "src/common/correctDataFunctionFormUnitAndPrice";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

const ExportCreate = () => {
  const isLoading = useSelector(selectIsLoading);

  const [data] = useState({
    code: "",
    date: moment().toDate(),
    note: "",
  });

  const onSubmit = async (data) => {
    const _data = correctExport(data);

    const res = await create(_data);

    if (res.status) {
      history.push("/export/list");
      noti("success", SUCCESS_MESSAGE.EXPORT.CREATE);
    } else {
      noti("error", ERROR_MESSAGE.EXPORT.CREATE);
    }
  };

  return (
    <MForm edit={false} data={data} isLoading={isLoading} onSubmit={onSubmit} />
  );
};

export default ExportCreate;
