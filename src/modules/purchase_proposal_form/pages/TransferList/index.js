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
import { fireDelete, fireSuccess } from "src/utils/alert";
import { isCentral, isSuccess } from "src/utils/funcs";
import { NAME } from "../../reducers/purchase-proposal-form";
import { setFilter } from "src/common/actions/config.action";

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

  const { data, set, refetch } = getAll(filters, isLoading, {
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
      history.push(`/solution/form/${selected[0].code}`);
  });

  const onApprove = useCallback((status) => async () => {
    setFetching(true);
    const res = await mutation.mutateAsync({
      code: selected.map((s) => s.code),
      status,
    });

    if (isSuccess(res)) {
      noti("success", res.message);
      refetch();
    } else {
      setFetching(false);
    }
  });

  const onRemove = useCallback(async () => {
    const allow = await fireDelete();
    if (allow) {
      const res = await remove(selected.map((s) => s.code));

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
            isApproving={mutation.isLoading}
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
