import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import TransferForm from "../../components/TransferForm";
import { getTransferById } from "src/common/queries-fn/material.query";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

const TransferUpdate = ({ match: { params } }) => {
  //#region Data
  const isLoading = useSelector(selectIsLoading);

  const { data } = getTransferById(params?.id);
  //#endregion

  //#region Render
  return <TransferForm isLoading={isLoading} edit={true} data={data} />;
  //#endregion
};

export default TransferUpdate;
