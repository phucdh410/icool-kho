import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { returnApi } from "src/apis/return_slip.api";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

import { getByCode } from "_common/queries-fn/inventory-return.query";

import Form from "../../../components/Form/Return";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);
const InventoryReturnUpdate = ({ match: { params } }) => {
  // #region Data
  const isLoading = useSelector(selectIsLoading);

  const { data } = getByCode(params.code, isLoading);
  // #endregion

  // #region Events
  const onSubmit = async (data) => {
    const res = await returnApi.save_update({
      code: params.code,
      wareCode: data?.wareCode,
      note: data?.note,
      date: data?.date,
      material_ids: data?.materials?.map((e) => e.id),
    });

    if (res) {
      history.push("/inventory-return/list");

      noti("success", SUCCESS_MESSAGE.INVENTORY_RETURN.UPDATE);
    } else {
      noti("error", ERROR_MESSAGE.INVENTORY_RETURN.UPDATE);
    }
  };
  // #endregion

  // #region Render
  return <Form edit isLoading={isLoading} data={data} onSubmit={onSubmit} />;
  // #endregion
};

export default InventoryReturnUpdate;
