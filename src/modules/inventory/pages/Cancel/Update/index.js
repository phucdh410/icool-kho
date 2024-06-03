import React from "react";
import { useSelector } from "react-redux";

import Form from "../../../components/Form/Cancellation";

import { getByCode } from "_common/queries-fn/inventory-cancel.query";
import { createSelector } from "reselect";

import { cancelApi } from "src/apis/cancellation_slip.api";

import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

const InventoryCancelCreate = ({ match: { params } }) => {
  // #region Data
  const isLoading = useSelector(selectIsLoading);

  const { data } = getByCode(params.code, isLoading);
  // #endregion

  const onSubmit = async (data) => {
    const res = await cancelApi.save_update({
      code: params.code,
      wareCode: data?.wareCode,
      note: data?.note,
      date: data?.date,
      material_ids: data?.materials?.map((e) => e.id),
    });

    if (res) {
      history.push("/inventory-cancel/list");
      noti("success", SUCCESS_MESSAGE.INVENTORY_CANCEL.UPDATE);
    } else {
      noti("error", error?.message || ERROR_MESSAGE.INVENTORY_CANCEL.UPDATE);
    }
  };

  return <Form edit onSubmit={onSubmit} data={data} />;
};

export default InventoryCancelCreate;
