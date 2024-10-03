import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import { phieuNhapHangApi } from "src/1/apis/phieu_nhap_hang.api";
import { approve } from "src/apis/purchase_slip.api";
import { history } from "src/App";
import { setFilter } from "src/common/actions/config.action";
import { fireDelete, fireError, fireSuccess } from "src/utils/alert";
import { isSuccess } from "src/utils/funcs";

import { getAll } from "_common/queries-fn/purchase-slip.query";

import { NAME } from "../../reducers/import";

import Table from "./Table";
import Toolbar from "./Toolbar";

const selectData = createSelector(
  (state) => state.config,
  (state) => state.auth,
  (state) => state.import,
  ({ isLoading }, { store_code }, { filters }) => ({
    isLoading,
    filters: {
      ...filters,
      store_code: filters.store_code ? filters.store_code : store_code,
    },
  })
);

const ImportList = () => {
  const dispatch = useDispatch();
  //#region Data
  const { isLoading, filters } = useSelector(selectData);

  const [isFetching, setFetching] = useState(false);

  const [status, setStatus] = useState(0);
  const { data, set, refetch } = getAll(filters, isLoading, {
    onSuccess: () => setFetching(false),
  });

  const isSelectAll = useMemo(
    () => data?.every((d) => d.approvedStatus || d.check),
    [data]
  );

  const selected = useMemo(
    () =>
      isFetching ? [] : data?.filter((d) => !d.approvedStatus && d.check) || [],
    [data, isFetching]
  );
  //#endregion

  //#region Event
  const select = useCallback(
    (code, v) =>
      set(
        data?.map((d) =>
          !d.approvedStatus && (code === -1 || d.code === code)
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

  const onEdit = useCallback(() => {
    if (selected.length === 1) history.push(`/import/form/${selected[0]?.id}`);
  });

  const onApprove = useCallback(async () => {
    setFetching(true);
    const res = await approve({ code: selected.map((s) => s.code) });

    if (isSuccess(res)) {
      refetch();
      noti("success", "Đã nhập hàng vào kho");
    } else {
      setFetching(false);
      noti("error", "Nhập hàng vào kho thất bại");
    }
  });

  const onRemove = async () => {
    const allow = await fireDelete();
    if (allow) {
      try {
        await phieuNhapHangApi.remove(selected?.[0]?.id);

        refetch();
        fireSuccess();
      } catch (error) {
        fireError();
      }
    }
  };
  //#endregion

  //#region Render
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            filter={filters}
            status={status}
            selectedNo={selected.length}
            toggleStatus={onStatusChange}
            onSearch={onSearch}
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
  //#endregion
};

export default ImportList;
