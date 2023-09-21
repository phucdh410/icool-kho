import { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import MForm from "../../components/Form";

import { create } from "src/apis/purchase_slip.api";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";
import { correctImport } from "src/common/correctDataFunctionFormUnitAndPrice";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

const selectUserWarehouse = createSelector(
  (state) => state.auth,
  ({ wareCode }) => wareCode
);

const ImportCreate = () => {
  const isLoading = useSelector(selectIsLoading);
  const wareCode = useSelector(selectUserWarehouse);

  const [data] = useState({
    code: "",
    wareCode: wareCode,
    date: moment().toDate(),
    note: "",
  });

  const onSubmit = async (data) => {
    const _data = correctImport(data);

    const res = await create(_data);
    if (res.status) {
      history.push("/import/list");
      noti("success", SUCCESS_MESSAGE.IMPORT.CREATE);
    } else {
      noti("error", ERROR_MESSAGE.IMPORT.CREATE);
    }
  };

  return <MForm data={data} isLoading={isLoading} onSubmit={onSubmit} />;
};

export default ImportCreate;
