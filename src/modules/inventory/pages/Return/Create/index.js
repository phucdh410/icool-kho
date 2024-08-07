import { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { returnApi } from "src/apis/return_slip.api";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

import Form from "../../../components/Form/Return";

const selectCurrentUser = createSelector(
  (state) => state.auth,
  ({ user }) => user
);

const InventoryReturnCreate = () => {
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

    const res = await returnApi.save_create(payload);

    if (res) {
      history.push("/inventory-return/list");
      noti("success", SUCCESS_MESSAGE.INVENTORY_RETURN.CREATE);
    } else {
      noti("error", ERROR_MESSAGE.INVENTORY_RETURN.CREATE);
    }
  };

  return <Form edit={false} onSubmit={onSubmit} data={data} />;
};

export default InventoryReturnCreate;
