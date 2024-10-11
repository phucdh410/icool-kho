import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import { setFilter } from "src/common/actions/config.action";

import { getInstants } from "_common/queries-fn/inventory-slip.query";

import { InstantInventoryAdjustmentModal } from "../../../components/InstantInventoryAdjustmentModal";
import { NAME } from "../../../reducers/inventory-slip-instant";

import Table from "./Table";
import Toolbar from "./Toolbar";

const selectData = createSelector(
  (state) => state.config,
  (state) => state.auth,
  (state) => state.inventorySlipInstant,
  (state) => state,
  ({ isLoading }, { ware_code }, { filters }) => ({
    isLoading,
    filters: { ...filters, ware_code: filters?.ware_code ?? ware_code },
  })
);

const InventoryInstant = ({}) => {
  const dispatch = useDispatch();

  //#region Data
  const modalRef = useRef(null);

  const { isLoading, filters } = useSelector(selectData);

  const [status, setStatus] = useState(0);

  const { data } = getInstants(filters, isLoading);
  //#endregion

  //#region Event
  const onStatusChange = useCallback(
    (_status) => setStatus(_status === status ? 0 : _status),
    [status]
  );
  const onSearch = useCallback(
    (data) => dispatch(setFilter(NAME, data)),
    [dispatch]
  );
  const onAdjust = () => {
    modalRef.current?.open();
  };
  //#endregion

  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            filter={filters}
            status={status}
            toggleStatus={onStatusChange}
            onSearch={onSearch}
            onAdjust={onAdjust}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader></CCardHeader>
        <CCardBody className="px-0 pt-0">
          <Table data={data} />
        </CCardBody>
      </CCard>

      <InstantInventoryAdjustmentModal ref={modalRef} />
    </>
  );
};

export default InventoryInstant;
