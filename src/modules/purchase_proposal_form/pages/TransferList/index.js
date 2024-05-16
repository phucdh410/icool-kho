import { useState, useCallback, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardHeader, CCardBody } from "@coreui/react";

import Table from "./Table";
import Toolbar from "./Toolbar";

import {
  approver,
  getAll,
} from "_common/queries-fn/purchase-proposal-form.query";

import { approve, confirm, remove } from "src/apis/purchase_proposal_form.api";

import { history } from "src/App";
import { fireDelete, fireError, fireSuccess } from "src/utils/alert";
import { isCentral, isSuccess } from "src/utils/funcs";
import { NAME } from "../../reducers/purchase-proposal-form";
import { setFilter } from "src/common/actions/config.action";
import { getAllTransfers } from "src/common/queries-fn/material.query";
import { deleteTransfer, updateTransferStatus } from "src/apis/material.api";

const selectData = createSelector(
  (state) => state.config,
  (state) => state.auth,
  (state) => state.purchaseProposalForm,
  ({ isLoading }, { storeCode }, { filters }) => ({
    isLoading,
    storeCode,
    filters,
  })
);

const TransferList = () => {
  const dispatch = useDispatch();
  //#region Data
  const { isLoading, storeCode, filters } = useSelector(selectData);

  const [isFetching, setFetching] = useState();

  const [status, setStatus] = useState(0);

  const { data, set, refetch } = getAllTransfers(filters, isLoading, {
    onSuccess: () => setFetching(false),
  });

  const mutation = approver(isCentral(storeCode) ? confirm : approve);

  const isSelectAll = useMemo(
    () => data?.every((d) => d.status || d.check),
    [data]
  );

  const selected = useMemo(
    () => (isFetching ? [] : data?.filter((d) => !d.status && d.check) || []),
    [isFetching, data]
  );

  //#endregion

  //#region Event
  const select = useCallback(
    (code, v) =>
      set(
        data?.map((d) =>
          d.status !== 2 && (code === -1 || d.code === code)
            ? { ...d, check: v }
            : d
        )
      ),
    [data]
  );

  const onStatusChange = useCallback(
    (_status) => setStatus(_status === status ? 0 : _status),
    [status]
  );

  const onSearch = useCallback(
    (data) => dispatch(setFilter(NAME, data)),
    [dispatch]
  );

  const onAdd = useCallback(() => history.push());

  const onEdit = useCallback(() => {
    if (selected.length === 1)
      history.push(`/solution/transfer/form/${selected[0].id}`);
  });

  const onApprove = (approved_status) => async () => {
    setFetching(true);
    const res = await updateTransferStatus({
      code: selected[0]?.code,
      id: selected[0]?.id,
      approved_status,
    });
    if (isSuccess(res)) {
      noti("success", res.message);
      setFetching(false);
      refetch();
    } else {
      noti("error", "Phiếu này đã bị từ chối/xác nhận.");
    }
    setFetching(false);
  };

  const onRemove = useCallback(async () => {
    const allow = await fireDelete();
    if (allow) {
      const res = await deleteTransfer(selected?.[0]?.id);

      if (isSuccess(res)) {
        refetch();
        fireSuccess();
      } else {
        fireError();
      }
    }
  }, [selected, refetch]);
  //#endregion

  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            isLoading={isFetching}
            filter={filters}
            status={status}
            selectedNo={selected.length}
            toggleStatus={onStatusChange}
            onSearch={onSearch}
            onAdd={onAdd}
            onEdit={onEdit}
            onApprove={onApprove}
            onRemove={onRemove}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader></CCardHeader>
        <CCardBody className="px-0 pt-0">
          <Table
            loading={isLoading}
            isSelectAll={isSelectAll}
            data={data}
            onSelect={select}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default TransferList;
