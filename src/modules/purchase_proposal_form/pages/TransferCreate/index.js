import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import TransferForm from "../../components/TransferForm";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

const TransferCreate = ({}) => {
  //#region Data
  const isLoading = useSelector(selectIsLoading);

  //#region Render
  return <TransferForm isLoading={isLoading} edit={false} />;
  //#endregion
};

export default TransferCreate;
