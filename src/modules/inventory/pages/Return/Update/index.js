import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import Form from "../../../components/Form/Check";

import { update } from "src/apis/return_slip.api";
import { getByCode } from "_common/queries-fn/inventory-return.query";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

import { correctInventoryCheck } from "_common/correctDataFunctionFormUnitAndPrice";

import { isSuccess } from "src/utils/funcs";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);
const InventoryReturnUpdate = () => {
  // #region Data
  const isLoading = useSelector(selectIsLoading);

  const { data } = getByCode(params.code, isLoading);
  // #endregion

  // #region Events
  const onSubmit = async (data) => {
    const _data = correctInventoryCheck(data);

    const res = await update(_data);

    if (isSuccess(res)) {
      history.push("/inventory-return/list");

      noti("success", SUCCESS_MESSAGE.INVENTORY_RETURN.UPDATE);
    } else {
      noti("error", ERROR_MESSAGE.INVENTORY_RETURN.UPDATE);
    }
  };
  // #endregion

  // #region Render
  return (
    <Form isLoading={isLoading} edit={true} data={data} onSubmit={onSubmit} />
  );
  // #endregion
};

export default InventoryReturnUpdate;
