import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardBody } from "@coreui/react";

import { setFilter } from "src/common/actions/config.action";

import { getAllReport } from "_common/queries-fn/purchase-proposal-form.query";

import { getAll as getAllStores } from "../../queries-fn/store.query";
import { NAME } from "../../reducers/order";

import Table from "./Table";
import Toolbar from "./Toolbar";

const selectData = createSelector(
  (state) => state.config,
  (state) => state.auth,
  (state) => state.summaryOrder,
  ({ isLoading }, { store_code }, { filters }) => ({
    isLoading,
    filters: { ...filters, storeIds: filters.storeIds ?? [store_code] },
  })
);

const OrderSummary = () => {
  const dispatch = useDispatch();
  //#region Data
  const { isLoading, filters } = useSelector(selectData);

  const { data, loading } = getAllReport(filters, isLoading);

  const { data: stores } = getAllStores({}, isLoading);

  const selectedStore = useMemo(() => {
    if (filters.storeIds?.length && stores)
      return filters.storeIds.map((s) => stores.find((_s) => _s.value === s));
    return stores ?? [];
  }, [filters?.storeIds, stores]);
  //#endregion

  //region Events
  const onExport = () => {};

  const onSearch = (v) => dispatch(setFilter(NAME, v));
  //#endregion

  //#region Render
  return (
    <>
      <CCard>
        <CCardBody className="toolbar sticky">
          <Toolbar
            filter={filters}
            isLoading={isLoading}
            stores={stores}
            onSearch={onSearch}
            onExport={onExport}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody className="px-0">
          <Table loading={loading} data={data} stores={selectedStore} />
        </CCardBody>
      </CCard>
    </>
  );
  //#endregion
};

export default OrderSummary;
