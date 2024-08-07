import { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { cancelApi } from "src/apis/cancellation_slip.api";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

import Form from "../../../components/Form/Cancellation";

const selectCurrentUser = createSelector(
  (state) => state.auth,
  ({ user }) => user
);

const InventoryCancelCreate = () => {
  const user = useSelector(selectCurrentUser);

  const [data] = useState({
    createdBy: user.code,
    store_code: user.store_code,
    ware_code: user.ware_code,
    checked: new Date(),
    note: "",
  });

  const onSubmit = async (data) => {
    const payload = {
      ware_code: data?.ware_code,
      note: data?.note,
      date: data?.date,
      material_ids: data?.materials?.map((e) => e.id),
    };

    const res = await cancelApi.save_create(payload);

    if (res) {
      history.push("/inventory-cancel/list");
      noti("success", SUCCESS_MESSAGE.INVENTORY_CANCEL.UPDATE);
    } else {
      noti("error", ERROR_MESSAGE.INVENTORY_CANCEL.UPDATE);
    }
  };

  return <Form edit={false} onSubmit={onSubmit} data={data} />;
};

export default InventoryCancelCreate;
