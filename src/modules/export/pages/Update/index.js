import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import MForm from "../../components/Form";

import { getByCode } from "_common/queries-fn/export.query";
import { update } from "src/apis/export_slip.api";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";
import { correctExport } from "src/common/correctDataFunctionFormUnitAndPrice";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

const ExportUpdate = ({ match: { params } }) => {
  const isLoading = useSelector(selectIsLoading);

  const { data } = getByCode(params.code, isLoading);

  const onSubmit = async (data) => {
    const _data = correctExport(data);

    const res = await update(_data);

    if (res.status) {
      history.push("/export/list");
      noti("success", SUCCESS_MESSAGE.EXPORT.UPDATE);
    } else {
      noti("error", ERROR_MESSAGE.EXPORT.UPDATE);
    }
  };

  return (
    <>
      <MForm
        edit={true}
        data={data}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ExportUpdate;
